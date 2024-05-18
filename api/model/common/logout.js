const conn = require("../conn/index");
const bcrypt = require("bcrypt");

const logout = async (id, role) => {
    const table = conn.getRole(parseInt(role) ? "seeker" : "owner");
  const pool = conn.pool;
  try {
    const query = await pool.query(
      `UPDATE ${table} SET loggedin = $1 WHERE id = $2`,
      [0, id]
    );
    return { success: true };
  } catch (err) {
    return { success: false };
  }
};

module.exports = logout;
