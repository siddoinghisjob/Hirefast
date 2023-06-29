const router = require('express').Router();
const auth = require("../../../middleware/auth/auth")(1);

const controllers = require("../../../controller/seekerController");
const middlewares = require("../../../middleware/validate/seeker/index");

router.use(auth);
router.put('/',middlewares.profile, controllers.profile);

module.exports = router;