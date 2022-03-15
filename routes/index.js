const router = require('express').Router();
const userRouters = require('./users');
const moviesRouters = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateCreateUser, validateLogin } = require('../middlewares/validate');

router.use('/signup', validateCreateUser, createUser);
router.use('/signin', validateLogin, login);

router.use(auth);

router.use('/users', auth, userRouters);
router.use('/movies', auth, moviesRouters);

module.exports = router;
