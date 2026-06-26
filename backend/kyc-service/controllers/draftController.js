const KycDraft = require('../models/kycDraft');

exports.saveDraft = async (req, res) => {
  try {
    // Fallback: Agar token se req.user na mile, toh body se userId le lo (Testing ke liye)
    const userId = req.user?.userId || req.body.userId; 

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required." });
    }

    const { currentStep, draftData } = req.body;

    // Naya Mongoose Syntax: returnDocument: 'after'
    const draft = await KycDraft.findOneAndUpdate(
      { userId },
      { currentStep, draftData },
      { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ success: true, lastUpdated: draft.lastUpdated });
  } catch (error) {
    console.log("🚨 === ASLI ERROR (SAVE DRAFT) === 🚨", error.message, error);
    res.status(500).json({ success: false, message: 'Error saving draft.', error: error.message });
  }
};

exports.resumeDraft = async (req, res) => {
  try {
    const userId = req.user?.userId || req.params.userId || req.query.userId;
    
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required." });
    }

    const draft = await KycDraft.findOne({ userId });

    if (!draft) {
      return res.status(200).json({ success: true, hasDraft: false });
    }

    res.status(200).json({
      success: true,
      hasDraft: true,
      data: {
        currentStep: draft.currentStep,
        draftData: draft.draftData,
        lastUpdated: draft.lastUpdated
      }
    });
  } catch (error) {
    console.log("🚨 === ASLI ERROR (RESUME DRAFT) === 🚨", error.message, error);
    res.status(500).json({ success: false, message: 'Error fetching draft.' });
  }
};