const gettest = require('../../../model/seekerModels').gettest;

const getTest = async(req, res) => {
    try{
        const query = await gettest(req.jwtid);
        return res.json(query).status(query.success?200:400);
    }
    catch(err){
        return res.json({success : false}).status(500);
    }
}

module.exports = getTest;