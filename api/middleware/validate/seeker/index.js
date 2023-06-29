const register = require("./register");
const login = require("../common/login");
const profile = require('./profile');
const joblist = require('./joblist');
const jobData = require('./jobdata');
const application_get = require('./application_get');
const application_post = require('./application_post');

module.exports = {register, login, profile, joblist, jobData, application_get, application_post};