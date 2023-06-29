const pool = require('../conn/index').pool;

const gettest = async (id) => {
    try{
        const tids = await pool.query('select id from test where user_id = $1',[parseInt(id)]);
        if(tids.rowCount <= 0) return {success: true, std : []};
        const std = new Array(tids.rowCount);
        for(let i = 0; i< std.length; i++){
            const query = await pool.query('select * from questions where tid = $1',[parseInt(tids.rows[i].id)]);
            std[i] = {number : query.rowCount, id : tids.rows[i].id};
        }
        return {success : true, std : std};
    }
    catch(err){
        return {success : false, std : []};
    }
}

module.exports = gettest;