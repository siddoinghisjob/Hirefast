const router = require("express").Router();
const auth = require("../../middleware/auth/auth")(0);
const middlewares = require("../../middleware/validate/owner/index");
const controllers = require("../../controller/ownerController");
const job= require("./job");
const test = require('./test');
const candidate = require('./candidate');

//AUTH ENDPOINT
router.post("/register", middlewares.register, controllers.register);
router.post("/login", middlewares.login, controllers.login);

// JOB ENDPOINT
router.use("/job",job);

//TEST ENDPOINT
router.use('/test',test);

//CANDIDATE ENDPOINT
router.use('/candidate',candidate);

module.exports = router;
