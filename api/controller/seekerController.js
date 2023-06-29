const register = require("./seeker/register");
const login = require("./seeker/login");
const profile = require("./seeker/profile");
const jobList = require('./seeker/job/list');
const jobSize = require('./seeker/job/totalsize');
const jobData = require('./seeker/job/jobdata');
const getTest = require('./seeker/test/list');
const applicationPost = require('./seeker/job/applicationsPost')
const get_applications = require('./seeker/job/applicationGet')

module.exports = {register, login, profile, jobList, jobSize, jobData, getTest, applicationPost, get_applications};