const KycDraft = require('../models/kycDraft');

exports.saveDraft = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { currentStep, draftData } = req.body;

    const draft = await KycDraft.findOneAndUpdate(
      { userId },
      { currentStep, draftData },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ success: true, lastUpdated: draft.lastUpdated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving draft.' });
  }
};

exports.resumeDraft = async (req, res) => {
  try {
    const userId = req.user.userId;
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
    res.status(500).json({ success: false, message: 'Error fetching draft.' });
  }
};