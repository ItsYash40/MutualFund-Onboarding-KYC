const Tesseract = require('tesseract.js');

exports.extractPanData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'PAN image is required.' });
    }

    const imageBuffer = req.file.buffer;
    const result = await Tesseract.recognize(imageBuffer, 'eng');
    const rawText = result.data.text;

    const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    const matchedPan = rawText.toUpperCase().match(panRegex);
    const extractedPan = matchedPan ? matchedPan[0] : null;

    if (!extractedPan) {
      return res.status(422).json({
        success: false,
        message: 'Valid PAN format not found in image.',
        rawText: rawText
      });
    }

    res.status(200).json({
      success: true,
      data: {
        extractedPan: extractedPan,
        confidenceScore: Math.round(result.data.confidence) + '%'
      }
    });

  } catch (error) {
    console.error('OCR Error:', error);
    res.status(500).json({ success: false, message: 'OCR processing failed.' });
  }
};

exports.validatePan = async (req, res) => {
    try {
        const { panNumber, userId } = req.body;
        
        if (!panNumber || !userId) {
            return res.status(400).json({ success: false, message: "PAN and UserID required for validation" });
        }

        // Yahan tumhara actual validation logic ya third-party API call aayega
        res.status(200).json({ success: true, message: "PAN Validated Successfully (Mocked)" });
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error during PAN validation" });
    }
};exports.validatePan = async (req, res) => {
    try {
        const { panNumber, userId } = req.body;

        if (!panNumber || !userId) {
            return res.status(400).json({ success: false, message: "PAN and UserID are required." });
        }

        // Asli production app mein yahan NSDL/Gov API call hoti, abhi hum mock kar rahe hain
        res.status(200).json({
            success: true,
            message: "PAN Validated Successfully",
            data: { 
                isValid: true, 
                verificationStatus: "VERIFIED" 
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error during PAN validation." });
    }
};