const pool = require('../conn').pool;

const jobSize = async() => {
    try{
        const query = await pool.query('select id from joblist');
        return {size : query.rowCount, success : true};
    }catch(err){
        return {success : false};
    }
}

module.exports = jobSize;