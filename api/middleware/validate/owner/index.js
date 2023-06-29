const register = require("./register");
const login = require("../common/login");
const details = require("../common/id_checker");
const del = require("./job/del");
const addJob = require('./job/listing');
const test = require('./test/test');
const candidate_post = require('./candidate/post.js');

module.exports = {register, login, del, test, details, addJob, candidate_post};