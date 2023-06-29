const conn = require("../conn/index");
const bcrypt = require("bcrypt");

const compare = (db_password, password) => {
  return new Promise(function (resolve) {
    bcrypt.compare(password, db_password, (err) => {
      if (err) resolve(false);
      resolve(true);
    });
  });
};

const loginChecker = async (password, email, role) => {
  const table = conn.getRole(role);
  const pool = conn.pool;
  try {
    const query = await pool.query(`SELECT * FROM ${table} WHERE email = $1`, [
      email,
    ]);
    if (query.rowCount != 1) return {success : false};
    const db_password = query.rows[0].password;
    const com = await compare(db_password, password);
    return {success : com, id : query.rows[0].id};
  } catch (err) {
    return {success : false};
  }
};

module.exports = loginChecker;
