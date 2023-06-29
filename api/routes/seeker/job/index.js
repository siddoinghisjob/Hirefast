const middlewares = require('../../../middleware/validate/seeker');
const controllers = require('../../../controller/seekerController');

const auth = require('../../../middleware/auth/auth')(1);

const router = require('express').Router();

router.use(auth);
router.get('/', middlewares.joblist, controllers.jobList);
router.get('/size', controllers.jobSize);
router.get('/:id', controllers.jobData);
router.post('/applications', middlewares.application_post ,controllers.applicationPost);
router.post('/applications/list',middlewares.application_get ,controllers.get_applications);

module.exports = router;