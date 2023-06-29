const addJobToDB = require("../../../model/ownerModels").addJob;

const addJob = async (req, res) => {
  try {
    const query = await addJobToDB(req);
    if (!query.success) return res.status(500).json({ success: false });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
};

module.exports = addJob;
