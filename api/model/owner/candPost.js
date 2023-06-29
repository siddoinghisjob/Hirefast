const pool = require("../conn/").pool;

const controller = async (jid, uid, method) => {
  try {
    const query = await pool.query(
      "update applications set state = $1 where jid = $2 and uid = $3",
      [method, jid, uid]
    );
    return { success: true };
  } catch (err) {
    return { success: false };
  }
};

module.exports = controller;
