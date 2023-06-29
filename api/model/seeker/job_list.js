const pool = require("../conn").pool;

const job_details = async (size, page, search) => {
  try {
    const results = await pool.query(
      "SELECT * from joblist where jobtitle ilike $2 OR offerings ilike $2 OR description ilike $2 OR addinfo ilike $2 OR coninfo ilike $2 OR requirements ilike $2 OR location ilike $2 ORDER BY id limit $1 offset $3",
      [size, "%"+search+"%", (page-1)*size]
    );
    const rows = results.rows?.map(row => ({id : row.id, title : row.jobtitle, status : row.status}));
    return { success: true, rows: rows };
  } catch (err) {
    return { success: false };
  }
};

module.exports = job_details;
