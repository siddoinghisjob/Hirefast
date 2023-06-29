const pool = require("../../conn").pool;

const job_details = async (search, id) => {
  try {
    const results = await pool.query(
      "SELECT * from joblist WHERE owner_id = $1 and (jobtitle ilike $2 or description ilike $2 or requirements ilike $2 or location ilike $2 or offerings ilike $2) ORDER BY id desc",
      [id, "%" + search + "%"]
    );
    return { success: true, rows: results.rows };
  } catch (err) {
    return { success: false };
  }
};

module.exports = job_details;
