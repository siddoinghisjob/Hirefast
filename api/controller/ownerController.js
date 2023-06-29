const register = require("./owner/register");
const login = require("./owner/login");
const search = require("./owner/job/search");
const details = require("./owner/job/details");
const lists = require("./owner/job/lists");
const deleteJobs = require('./owner/job/deleteJob');
const addJob = require('./owner/job/addJob');
const posttest = require('./owner/test/post');
const gettest = require('./owner/test/get');
const getidtest = require('./owner/test/id');
const getCandidates = require('./owner/candidate/get');
const setCandidates = require('./owner/candidate/post');

module.exports = { register, login, search, details, lists, deleteJobs, addJob, posttest, gettest ,getidtest, setCandidates, getCandidates};