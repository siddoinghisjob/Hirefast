const checkForEmail = require("./common/checkForEmail");
const { insertIntoSeeker } = require("./common/insertIntoUsers");
const loginChecker = require("./common/loginChecker");
const jobList = require("./seeker/job_list");
const jobSize = require("./seeker/job_size");
const jobData = require("./seeker/job_data");
const gettest = require("./seeker/test_list");
const applicationPost = require("./seeker/applications_post");
const applicationGet = require("./seeker/application_get");

module.exports = {
  checkForEmail,
  insertIntoSeeker,
  loginChecker,
  jobList,
  jobSize,
  jobData,
  gettest,
  applicationPost,
  applicationGet,
};
