const jobSize = require('../../../model/seekerModels').jobSize;

const totalSize = async (req, res) => {
    try{
        const query = await jobSize();
        if(query.success) return res.status(200).json({success : true, size : query.size});
        return res.status(400).json({success : false});
    }
    catch(err){
        return res.status(400).json({success : false});
    }
}

module.exports = totalSize;