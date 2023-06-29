const checkForEmail = require("./common/checkForEmail");
const {insertIntoOwner} = require("./common/insertIntoUsers");
const loginChecker = require("./common/loginChecker");
const getDataById = require('./getDataById/owner_models');
const deleteFromJobs = require('./owner/deleteFromJobs');
const addJob = require('./owner/addjob');
const postTest = require('./owner/posttest');
const getTest = require('./owner/gettest');
const candidate_get = require('./owner/candGet');
const candidate_post = require('./owner/candPost');

module.exports = {checkForEmail, insertIntoOwner, getTest, postTest, loginChecker, getDataById, deleteFromJobs, addJob, candidate_get, candidate_post};