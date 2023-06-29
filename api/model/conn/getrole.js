const dotenv = require("dotenv").config();

const getRole = (role) => (role === "owner" ? process.env.owner : process.env.seeker);

module.exports = getRole;