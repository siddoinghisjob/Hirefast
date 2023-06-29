const pool = require("../conn").pool;

const gettest = async (id) => {
  try {
    const query = await pool.query(
      "select tid, jid from seekertestgroup where sid = $1",
      [id]
    );
    const noqs = [];
    for (let i = 0; i < query.rowCount; i++) {
      const noq = await pool.query(
        "select count(tid) noq from questions group by tid having tid = $1",
        [parseInt(query.rows[i].tid)]
      );
      const jtitle = await pool.query(
        "select jobtitle from joblist where id = $1",
        [query.rows[i].jid]
      );
      noqs.push({ id: query.rows[i].tid, title : jtitle.rows[0].jobtitle, num: noq.rows[0].noq, jid : query.rows[i].jid });
    }
    return {
      success: true,
      noqs: noqs,
    };
  } catch (err) {
    
    return {
      success: false,
    };
  }
};

module.exports = gettest;
