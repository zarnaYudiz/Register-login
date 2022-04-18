const router = require('express').Router();
const controllers = require('./lib/controllers');
const validators = require('./lib/validators');
const middleware = require('./lib/middleware');

router.post('/', validators.register, controllers.addUser);   
router.post('/logout', middleware.authenticateToken, controllers.logout );
router.post('/login', validators.register, controllers.userLogin);
router.post('/stripePayment', controllers.stripePayment);

module.exports = router;