const router = require("express").Router();

const auth = require("../middleware/auth/auth");
const auth_controller = require("../controller/common/auth"); 
const logout_controller = require("../controller/common/logout"); 
const owner = require("./owner/index");
const seeker = require("./seeker/index");

router.post("/auth",auth(2), auth_controller);
router.post("/logout",auth(2), logout_controller);
router.use("/owner",owner);
router.use("/seeker",seeker);

module.exports =  router;