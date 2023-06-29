const router = require("express").Router();
const auth = require("../../../middleware/auth/auth")(0);
const middlewares = require("../../../middleware/validate/owner");
const controllers = require("../../../controller/ownerController");

//AUTH ENDPOINT
router.use(auth);
router.get("/search", controllers.search);
router.get("/details", middlewares.details, controllers.details);
router.get("/list", controllers.lists);
router.post("/list", middlewares.addJob, controllers.addJob);
router.delete("/list", middlewares.del, controllers.deleteJobs);

module.exports = router;