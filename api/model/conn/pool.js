require("dotenv").config();
const { Pool } = require("pg");

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

const pool = new Pool({
  host: PGHOST,
  user : PGUSER,
  password : PGPASSWORD,
  database : PGDATABASE,
  port : PGPORT
});

module.exports = pool;