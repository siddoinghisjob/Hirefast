const getTestByid = require('../../../model/getDataById/owner_models').test_byid;

const id = async (req, res) => {
    try{
        const query = await getTestByid(req.params.id);
        if(!query.success) return res.json({success : false}).status(500);
        const testset = {
            questions : query.questions,
            answers : query.answers
        }
        res.json({success : true, testset : testset}).status(200);
    }
    catch(err){
        res.json({success : false}).status(500);
    }
}

module.exports = id;