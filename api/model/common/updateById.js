const pool = require('../conn').pool;
const table = require('../conn').getRole;

const desc = async (role, description, id) => {
    try{
        const sql = `update ${table(role)} set ${role === "seeker" ? "bio":"desc"} = $1 where id = $2`;
        const query = await pool.query(sql,[description, id]);
        return true;
    }
    catch(err){
        return false;
    }
}

module.exports = {desc};