const JobData = require('../../../model/seekerModels').jobData;

const jobData = async (req, res) => {
    try{
        const query = await JobData(req.params.id);
        if(query.success) res.json(query).status(200);
        else res.json(query).status(400);
    }    
    catch(err){
        res.json({success : false}).status(400);
    }
}

module.exports = jobData;