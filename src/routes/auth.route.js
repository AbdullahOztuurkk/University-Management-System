const express = require('express');
const { login, me, forgotPassword, resetPassword, logout } = require('../controllers/auth.controller');
const { jwtAuthentication } = require('../middleware/auth');
const { createValidator } = require('express-joi-validation');
const loginDto = require('../models/user/dtos/user-login.dto');
const emailDto = require('../models/user/dtos/user-email.dto');
const pwdDto = require('../models/user/dtos/user-pwd.dto');


const router = express.Router();

router.post('/login', loginDto, login);
router.get('/me', jwtAuthentication, me);
router.post('/forgotpassword', emailDto, forgotPassword);
router.patch('/resetpassword', pwdDto, jwtAuthentication, resetPassword);
router.post('/logout', jwtAuthentication, logout);

module.exports = router;