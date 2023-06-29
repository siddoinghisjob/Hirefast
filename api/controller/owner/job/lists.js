const getDataById = require("../../../model/ownerModels").getDataById.job_list;

const list = async (req, res) => {
  try {
    const result = await getDataById(req.jwtid);
    if (!result.success) return res.status(400).json({ success: false });
    res.status(200).json({ success: true, rows: result.rows });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

module.exports = list;
