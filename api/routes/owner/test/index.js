const router = require('express').Router();
const auth = require('../../../middleware/auth/auth')(0);
const middleware = require("../../../middleware/validate/owner");
const test = require("../../../controller/ownerController");

router.use(auth);
router.post('/', middleware.test, test.posttest);
router.get('/', test.gettest);
router.get('/:id', test.getidtest);

module.exports = router