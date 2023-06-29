const applicationGetModel = require('../../../model/seekerModels').applicationGet;

const applicationGet = async(req, res) => {
    try{
        const query = await applicationGetModel(req.jwtid, req.body.jid);
        flag = query.success;
        return res.status(200).json({success : flag, state : query?.state});
    }
    catch(err){
        return res.status(400).json({success : false});
    }
}

module.exports = applicationGet;