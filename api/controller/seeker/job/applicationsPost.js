const applicationPostModel = require('../../../model/seekerModels').applicationPost;

const applicationPost = async(req, res) => {
    try{
        const query = await applicationPostModel(req.jwtid, req.body.jid, req.body.resume);
        const flag = query.success;
        return res.status(flag?200:400).json({success : flag});
    }catch(err){
        return res.json({success : false}).status(400);
    }
}

module.exports = applicationPost;