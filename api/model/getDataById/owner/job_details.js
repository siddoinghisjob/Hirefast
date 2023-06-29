const pool = require("../../conn").pool;

const job_details = async (id) => {
  try {
    const query = await pool.query(
      "SELECT jobtitle from joblist WHERE id = $1",
      [id]
    );
    if (query.rowCount === 0) return { success: false };
        return { success: true, rows: query.rows[0] };
  } catch (err) {
    return { success: false };
  }
};

module.exports = job_details;
