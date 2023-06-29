const dotenv = require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port
});

module.exports = pool;