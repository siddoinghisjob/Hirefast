const getDataById = require("../../../model/ownerModels").getDataById.job_details;
const details = async (req, res) => {
  try {
    const data = await getDataById(req.query.id);
    if (!data.success) return res.status(400).json({ success: false });
    return res.status(200).json({ success: true, rows: data.rows });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

module.exports = details;