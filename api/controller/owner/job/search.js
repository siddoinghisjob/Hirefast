const job_search = require("../../../model/ownerModels").getDataById.job_search;

const search = async (req, res) => {
    const query = await job_search(req.query.search,req.jwtid);
    if(!query.success) return res.status(500).json({ success: false });
    res.status(200).json({ success: true, rows: query.rows });
}

module.exports = search;