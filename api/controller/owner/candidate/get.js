const getApplications = require('../../../model/ownerModels').candidate_get;

const controller = async(req, res) => {
    try{
        const query = await getApplications(req.query.jid);
        if(query.success){
            return res.json({success : true, data : query.data}).status(200);
        }
        return res.json({success : false}).status(400);
    }
    catch(err){
        return res.json({success : false}).status(400); 
    }
}

module.exports = controller;