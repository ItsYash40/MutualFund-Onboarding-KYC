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