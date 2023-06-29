const pool = require("../conn/").pool;

const applicationGet = async (uid, jid) => {
  try {
    const query = await pool.query("select * from applications where jid = $1 and uid = $2",[jid, uid]);
    if(parseInt(query.rowCount) > 0){
      return { success: true, state : query.rows[0].state };
    }  
    else{
      return { success: false, state : 0 };
    }
  } catch (err) {
    return { success: false };
  }
};

module.exports = applicationGet;
