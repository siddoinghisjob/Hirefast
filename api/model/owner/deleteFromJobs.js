const pool = require('../conn/index').pool;

const deleteFromJobs = async (id) => {
    try {
        const query = await pool.query("DELETE from joblist WHERE id = $1", [id]);
        return true;
    }
    catch(err){
        return false;
    }
}

module.exports = deleteFromJobs