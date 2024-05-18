const conn = require("../../conn/index");

const ac_info = async (id, role) => {
  const pool = conn.pool;
  const table = conn.getRole(parseInt(role) ? "seeker" : "owner");
  try {
    const query = await pool.query(`select * from ${table} where id = ${id}`);
    if (query.rowCount != 1) return { success: false };
    return { success: true, ...query.rows[0] };
  } catch (err) {
    return { success: false };
  }
};

module.exports = ac_info;
