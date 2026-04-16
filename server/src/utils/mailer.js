const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'mail.thinkoutsource.co.za',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: false
    },
    logger: true, // Enable logging for troubleshooting
    debug: true   // Include SMTP traffic in logs
});

const sendConfirmationEmail = async (toEmail, subject, htmlContent) => {
    try {
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
            console.warn('[Mailer] SMTP credentials not configured. Skipping confirmation email to:', toEmail);
            return false;
        }

        let from = process.env.SMTP_FROM || '"Think Outsource" <noreply@thinkoutsource.co.za>';
        // If it's just an email, add the display name
        if (from.includes('@') && !from.includes('<')) {
            from = `"Think Outsource" <${from}>`;
        }

        const info = await transporter.sendMail({
            from: from,
            to: toEmail,
            subject: subject,
            html: htmlContent
        });

        console.log('[Mailer] Confirmation email sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('[Mailer Error] Failed to send email to:', toEmail, error);
        return false;
    }
};

const getContactTemplate = (name) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #2563eb;">Inquiry Received</h2>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to Think Outsource. We have received your inquiry and your strategy slot booking request.</p>
        <p>One of our specialists will review your details and contact you shortly to confirm your booking and discuss how we can help your business scale.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>The Think Outsource Team</strong></p>
        <p style="font-size: 12px; color: #64748b;">This is an automated message. Please do not reply to this email.</p>
    </div>
`;

const getCareerTemplate = (firstName) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #2563eb;">Application Received</h2>
        <p>Hi ${firstName},</p>
        <p>Thank you for expressing interest in growing your career with Think Outsource.</p>
        <p>Our recruitment team has received your details and CV link. We will review your application and reach out if your profile matches our current opportunities.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>Think Outsource Recruitment</strong></p>
        <p style="font-size: 12px; color: #64748b;">This is an automated message. Please do not reply to this email.</p>
    </div>
`;

const getDebtTemplate = (name) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #2563eb;">Debt Review Inquiry Received</h2>
        <p>Hi ${name},</p>
        <p>Thank you for trusting ThinkDebt Solutions. This email confirms that we have securely received your details.</p>
        <p>One of our verified, NCR-compliant specialists has been notified and will be in touch with you shortly to discuss the next steps towards your financial freedom.</p>
        <br/>
        <p>Read more about the process on our website or reply to this email if you have urgent questions.</p>
        <br/>
        <p>Warm regards,</p>
        <p><strong>ThinkDebt Solutions Partnerships</strong></p>
        <p style="font-size: 12px; color: #64748b;">This is an automated message. Please do not reply directly to this email.</p>
    </div>
`;

module.exports = {
    sendConfirmationEmail,
    getContactTemplate,
    getCareerTemplate,
    getDebtTemplate
};
