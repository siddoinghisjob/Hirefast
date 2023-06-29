const router = require('express').Router();
const middleware = require('../../../middleware/validate/seeker/index');
const controller = require('../../../controller/seekerController');

const auth = require('../../../middleware/auth/auth')(1);

router.use(auth);
router.get('/', controller.getTest);

module.exports = router;