const pool = require("../../conn").pool;

const job_details = async (id) => {
  try {
    const results = await pool.query(
      "SELECT * from joblist WHERE owner_id = $1 ORDER BY id desc",
      [id]
    );
    return { success: true, rows: results.rows };
  } catch (err) {
    return { success: false };
  }
};

module.exports = job_details;
