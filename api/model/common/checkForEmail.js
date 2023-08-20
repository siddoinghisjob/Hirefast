const conn = require("../conn/index");
const checkForEmail = async (role, email) => {
  
  try{
    const pool = conn.pool;
    const table = conn.getRole(role);
    const query = await pool.query(`SELECT * FROM ${table} WHERE email = $1`,[email]);
    console.log(query)
    if(query.rowCount > 0) return false;
    return true;
  }
  catch(err){
    return false;
  }
};

module.exports = checkForEmail;