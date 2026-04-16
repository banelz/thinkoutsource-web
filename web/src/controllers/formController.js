const pool = require('../config/db');
const { sendConfirmationEmail, getContactTemplate, getCareerTemplate, getDebtTemplate } = require('../utils/mailer');

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
    const { fullName, email, serviceInterest, message, selectedDate, selectedSlot } = req.body;
    try {
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

        res.json({ success: true, id: result.insertId });
    } catch (error) {
        console.error('[Controller Error] Contact:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.submitCareer = async (req, res) => {
    console.log('[Controller] Processing career submission');
    const { firstName, lastName, email, cvLink } = req.body;
    try {
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

        res.json({ success: true, id: result.insertId });
    } catch (error) {
        console.error('[Controller Error] Career:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.submitDebt = async (req, res) => {
    console.log('[Controller] Processing debt submission');
    const { fullName, phone, email, debtStatus, employmentStatus, employmentType } = req.body;
    try {
        const [result] = await pool.execute(
            "INSERT INTO debt_leads (full_name, phone_number, email, debt_status, employment_status, employment_type) VALUES (?, ?, ?, ?, ?, ?)",
            [fullName, phone, email, debtStatus, employmentStatus, employmentType]
        );
        
        // Send email asynchronously
        sendConfirmationEmail(email, "ThinkDebt Solutions - Request Received", getDebtTemplate(fullName));

        // Google Sheets Sync
        await sendToGoogleSheets({
            type: 'ThinkDebt Lead',
            fullName, phone, email, debtStatus, employmentStatus, employmentType
        });

        res.json({ success: true, id: result.insertId });
    } catch (error) {
        console.error('[Controller Error] Debt:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
