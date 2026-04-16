const crypto = require('crypto');

const hashData = (data) => {
    if (!data) return null;
    return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
};

const sendMetaConversionEvent = async (req, userData, eventName, eventSourceUrl, event_id) => {
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;
    const testEventCode = process.env.META_TEST_EVENT_CODE;

    if (!pixelId || !accessToken || pixelId === 'your_pixel_id_here' || pixelId === '920363914232014' && !accessToken) {
        console.log('[Meta CAPI] Skipping: META_PIXEL_ID or META_ACCESS_TOKEN not set');
        return;
    }

    // Extract Client Metadata
    const clientIpAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const clientUserAgent = req.headers['user-agent'];
    
    // Extract Meta Cookies (fbp, fbc)
    const cookies = {};
    if (req.headers.cookie) {
        req.headers.cookie.split(';').forEach(c => {
            const part = c.trim().split('=');
            if (part.length === 2) cookies[part[0]] = part[1];
        });
    }
    const fbp = cookies['_fbp'];
    const fbc = cookies['_fbc'];

    // Split name if possible
    const nameParts = (userData.fullName || '').split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const payload = {
        data: [
            {
                event_name: eventName,
                event_time: Math.floor(Date.now() / 1000),
                event_id: event_id,
                action_source: 'website',
                event_source_url: eventSourceUrl,
                user_data: {
                    em: [hashData(userData.email)],
                    ph: [hashData(userData.phone)],
                    fn: [hashData(firstName)],
                    ln: [hashData(lastName)],
                    db: [hashData(userData.dob)], // Date of Birth
                    ct: [hashData(userData.city)], // Town/City
                    st: [hashData(userData.state)], // County/Region
                    zp: [hashData(userData.zip)], // Postcode
                    country: [hashData(userData.country || 'za')], 
                    client_ip_address: clientIpAddress,
                    client_user_agent: clientUserAgent,
                    fbp: fbp,
                    fbc: fbc,
                    external_id: [hashData(userData.externalId?.toString())]
                },
                custom_data: {
                    content_name: 'ThinkDebt Solutions Lead',
                    content_category: 'Financial Services',
                    description: `Debt Status: ${userData.debtStatus}, Employment: ${userData.employmentStatus}`,
                    status: userData.debtStatus,
                    currency: 'ZAR',
                    value: 0.0
                }
            }
        ]
    };

    if (testEventCode && testEventCode !== 'TEST_EVENT_CODE_HERE') {
        payload.test_event_code = testEventCode;
    }

    try {
        console.log(`[Meta CAPI Full] Sending ${eventName} for ${userData.email}`);
        const response = await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        console.log('[Meta CAPI Full] Response:', result);
    } catch (error) {
        console.error('[Meta CAPI Full] Error:', error.message);
    }
};

module.exports = { sendMetaConversionEvent };
