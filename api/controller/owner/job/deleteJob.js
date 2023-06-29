const deleteFromJobs = require("../../../model/ownerModels").deleteFromJobs;

const deleteJobs = async (req, res) => {
  try {
    const data = await deleteFromJobs(req.body.id);
    if (!data) return res.status(400).json({ success: false });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

module.exports = deleteJobs;