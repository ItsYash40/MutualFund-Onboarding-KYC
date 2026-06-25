exports.sendOtp = async (req, res) => {
    try {
        const { aadharNumber } = req.body;

        if (!aadharNumber || aadharNumber.length !== 12 || isNaN(aadharNumber)) {
            return res.status(400).json({ success: false, message: 'Invalid 12-digit Aadhaar number.' });
        }

        await new Promise(resolve => setTimeout(resolve, 1500));

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully.',
            refId: 'SIM-' + Math.floor(Math.random() * 1000000)
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error during OTP generation.' });
    }
};

exports.verifyOtp = async (req, res) => {
    try {
        const { refId, otp } = req.body;

        if (!refId || !otp) {
            return res.status(400).json({ success: false, message: 'Reference ID and OTP are required.' });
        }

        await new Promise(resolve => setTimeout(resolve, 1500));

        if (otp === '123456') {
            return res.status(200).json({
                success: true,
                data: {
                    name: "John Doe",
                    dob: "1998-05-15",
                    address: "123, Tech Park, Developer Street",
                    verificationStatus: "APPROVED"
                }
            });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid OTP.' });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error during OTP verification.' });
    }
};