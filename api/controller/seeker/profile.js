const updateById = require('../../model/common/updateById').desc;

const profile = async (req, res) => {
    try{
        const query = await updateById('seeker', req.body.desc, req.jwtid);
        if(query) return res.status(200).json({success : true});
        return res.status(500).json({success:false});
    }
    catch(err){
        return res.status(500).json({success:false});
    }
}

module.exports = profile;