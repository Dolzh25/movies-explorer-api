const router = require('express').Router();
const userRouters = require('./users');
const moviesRouters = require('./movies');
const {
  createUser,
  login,
  checkAuth,
  signOut,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateCreateUser, validateLogin } = require('../middlewares/validate');

router.use('/signup', validateCreateUser, createUser);
router.use('/signin', validateLogin, login);

router.use(auth);

router.delete('/signout', auth, signOut);
router.get('/check-auth', auth, checkAuth);
router.use('/users', auth, userRouters);
router.use('/movies', auth, moviesRouters);

module.exports = router;
