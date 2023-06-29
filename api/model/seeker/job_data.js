const pool = require("../conn").pool;

const jobdata = async (id) => {
  try {
    const query = await pool.query("select * from joblist where id = $1", [id]);
    if (parseInt(query.rowCount) !== 1) return { success: false };
    return {
      success: true,
      job: {
        t: query.rows[0].jobtitle,
        d: query.rows[0].description,
        c: query.rows[0].coninfo,
        a: query.rows[0].addinfo,
        o: query.rows[0].offerings,
        jt: query.rows[0].jobtype,
        jr: query.rows[0].requirements,
        l: query.rows[0].location,
      },
    };
  } catch (err) {
    return { success: false };
  }
};

module.exports = jobdata;
