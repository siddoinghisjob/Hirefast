const controllers = require("../../controller/seekerController");
const middlewares = require("../../middleware/validate/seeker/index");
const profile = require('./profile');
const job = require('./job');
const test = require('./test');

const router = require("express").Router();

//AUTH ENDPOINT
router.post('/register',middlewares.register,controllers.register);
router.post('/login',middlewares.login,controllers.login);
router.use('/profile',profile);
router.use('/joblist',job);
router.use('/test',test);

module.exports = router;