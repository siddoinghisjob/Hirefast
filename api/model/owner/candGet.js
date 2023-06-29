const pool = require('../conn/').pool;

const controller = async(jid) => {
    try{
        const query = await pool.query('select * from applications where jid = $1',
        [jid]);
        const data = []
        for(let i = 0; i < query.rowCount; i++){
            let row = query.rows[i];
            const call = await pool.query('select name, email, resume, id from info where id = $1',[row.uid]);
            data.push({id : call.rows[0].id ,name : call.rows[0].name, email : call.rows[0].email, resume : call.rows[0].resume, inactive : row.state});
        }
        return {success : true, data : data};
    }
    catch(err){
        return {success : false};
    }
}

module.exports = controller;