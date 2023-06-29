const middleware = require('../../../middleware/validate/owner/index');
const controller = require('../../../controller/ownerController');

const auth = require('../../../middleware/auth/auth')(0);
const router = require('express').Router();

router.use(auth);

router.get('/', controller.getCandidates);
router.post('/', middleware.candidate_post, controller.setCandidates);

module.exports = router;