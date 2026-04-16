const pool = require('../config/db');
const { sendConfirmationEmail, getContactTemplate, getCareerTemplate, getDebtTemplate } = require('../utils/mailer');
const { sendMetaConversionEvent } = require('../utils/metaCapi');

// Helper for Google Sheets integration
const sendToGoogleSheets = async (data) => {
    const bridgeUrl = process.env.GOOGLE_SHEETS_BRIDGE_URL;
    if (!bridgeUrl) {
        console.log('[Sheets] Skipping: GOOGLE_SHEETS_BRIDGE_URL not set');
        return;
    }

    try {
        const response = await fetch(bridgeUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log('[Sheets] Sync success:', result);
    } catch (error) {
        console.error('[Sheets] Sync error:', error.message);
    }
};

exports.submitContact = async (req, res) => {
    console.log('[Controller] Processing contact submission');
    const { fullName, email, serviceInterest, message, selectedDate, selectedSlot, event_id } = req.body;
    try {
        // Duplicate Check (Email)
        const [existing] = await pool.execute(
            "SELECT id FROM inquiries WHERE email = ? LIMIT 1",
            [email]
        );
        if (existing.length > 0) {
            console.log(`[Controller] Duplicate inquiry blocked for ${email}`);
            return res.status(409).json({ 
                success: false, 
                message: "Your data has already been collected. An agent will get in touch soon." 
            });
        }

        const [result] = await pool.execute(
            "INSERT INTO inquiries (full_name, email, service_interest, message, selected_date, selected_slot) VALUES (?, ?, ?, ?, ?, ?)",
            [fullName, email, serviceInterest, message, selectedDate ? `2024-03-${selectedDate}` : null, selectedSlot]
        );
        
        // Send email asynchronously
        sendConfirmationEmail(email, "Think Outsource - Strategy Session Request Received", getContactTemplate(fullName));

        // Google Sheets Sync
        await sendToGoogleSheets({
            type: 'Contact Inquiry',
            fullName, email, serviceInterest, message, selectedDate, selectedSlot
        });

        // Meta Conversion API Sync
        await sendMetaConversionEvent(
            req,
            { fullName, email, externalId: result.insertId },
            'Contact',
            'https://thinkoutsource.co.za/contact',
            event_id
        );

        res.json({ success: true, id: result.insertId });
    } catch (error) {
        console.error('[Controller Error] Contact:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.submitCareer = async (req, res) => {
    console.log('[Controller] Processing career submission');
    const { firstName, lastName, email, cvLink, event_id } = req.body;
    try {
        // Duplicate Check (Email)
        const [existing] = await pool.execute(
            "SELECT id FROM career_interests WHERE email = ? LIMIT 1",
            [email]
        );
        if (existing.length > 0) {
            console.log(`[Controller] Duplicate career interest blocked for ${email}`);
            return res.status(409).json({ 
                success: false, 
                message: "Your data has already been collected. An agent will get in touch soon." 
            });
        }

        const [result] = await pool.execute(
            "INSERT INTO career_interests (first_name, last_name, email, cv_link) VALUES (?, ?, ?, ?)",
            [firstName, lastName, email, cvLink]
        );
        
        // Send email asynchronously
        sendConfirmationEmail(email, "Think Outsource - Application Received", getCareerTemplate(firstName));

        // Google Sheets Sync
        await sendToGoogleSheets({
            type: 'Career Interest',
            firstName, lastName, email, cvLink
        });

        // Meta Conversion API Sync
        await sendMetaConversionEvent(
            req,
            { fullName: `${firstName} ${lastName}`, email, externalId: result.insertId },
            'Lead',
            'https://thinkoutsource.co.za/about',
            event_id
        );

        res.json({ success: true, id: result.insertId });
    } catch (error) {
        console.error('[Controller Error] Career:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.submitDebt = async (req, res) => {
    console.log('[Controller] Processing debt submission');
    const { fullName, phone, email, debtStatus, employmentStatus, employmentType, event_id } = req.body;
    try {
        // Duplicate Check (Email OR Phone)
        const [existing] = await pool.execute(
            "SELECT id FROM debt_leads WHERE email = ? OR phone_number = ? LIMIT 1",
            [email, phone]
        );
        if (existing.length > 0) {
            console.log(`[Controller] Duplicate debt lead blocked for ${email} / ${phone}`);
            return res.status(409).json({ 
                success: false, 
                message: "Your data has already been collected. An agent will get in touch soon." 
            });
        }

        const [result] = await pool.execute(
            "INSERT INTO debt_leads (full_name, phone_number, email, debt_status, employment_status, employment_type) VALUES (?, ?, ?, ?, ?, ?)",
            [fullName, phone, email, debtStatus, employmentStatus, employmentType]
        );
        
        // Send email asynchronously
        sendConfirmationEmail(email, "ThinkDebt Solutions - Request Received", getDebtTemplate(fullName));

        await sendToGoogleSheets({
            type: 'ThinkDebt Lead',
            fullName, phone, email, debtStatus, employmentStatus, employmentType
        });

        await sendMetaConversionEvent(
            req,
            { fullName, phone, email, debtStatus, employmentStatus, externalId: result.insertId },
            'Lead',
            'https://thinkoutsource.co.za/thinkdebt-solutions',
            event_id
        );

        res.json({ success: true, id: result.insertId });
    } catch (error) {
        console.error('[Controller Error] Debt:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.submitUpdateLead = async (req, res) => {
    console.log('[Controller] Processing update_lead');
    const { id, type, status, notes } = req.body;
    
    if (!id || !type) {
        return res.status(400).json({ success: false, message: 'Missing ID or Type' });
    }

    let tableName = '';
    if (type.includes('Debt')) {
        tableName = 'debt_leads';
    } else if (type.includes('Contact')) {
        tableName = 'inquiries';
    } else {
        return res.status(400).json({ success: false, message: 'Invalid lead type' });
    }

    try {
        await pool.execute(
            `UPDATE ${tableName} SET lead_status = ?, notes = ? WHERE id = ?`,
            [status || 'New', notes || '', id]
        );
        console.log(`[Controller] Updated ${tableName} ID ${id}: status=${status}`);
        res.json({ success: true });
    } catch (error) {
        console.error('[Controller Error] Update Lead:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
