const userRouters = require('express').Router();
const { validateUpdateUserInfo } = require('../middlewares/validate');
const { getUserInfo, updateUserInfo } = require('../controllers/users');

userRouters.get('/me', getUserInfo);
userRouters.patch('/me', validateUpdateUserInfo, updateUserInfo);

module.exports = userRouters;
