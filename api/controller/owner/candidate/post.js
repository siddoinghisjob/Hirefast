const setApplications = require('../../../model/ownerModels').candidate_post;

const controller = async(req, res) => {
    try{
        const query = await setApplications(req.body.jid, req.body.uid, req.body.method);
        if(query.success){
            return res.status(200).json({success : true});
        }
        return res.status(400).json({success : false});
    }catch(err){
        return res.status(400).json({success : false});
    }
}

module.exports = controller;