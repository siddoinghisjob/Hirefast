const jobList = require('../../../model/seekerModels').jobList;

const JobList = async (req,res) => {
    try{
        const page = 1, size = req.query.size, search = req.query.search;
        const query = await jobList(size, page, search);
        if(query.success) return res.status(200).json({success : true, rows : query.rows});
        return res.status(420).json({success : false});
    }
    catch(err){
        res.status(420).json({success : false});
    }
}

module.exports = JobList