const pool = require("../conn").pool;

const applicationPost = async (id, jid, resume) => {
  try {
    const check = await pool.query(
      "select * from applications where uid = $1 and jid = $2",
      [id, jid]
    );
    if(check.rowCount > 0) return { success: true };
    const query = await pool.query(
      "insert into applications (uid, jid, state, resume) values ($1, $2, $3, $4)",
      [id, jid, 0, resume]
    );
    return { success: true };
  } catch (err) {
    return { success: false };
  }
};

module.exports = applicationPost;
