const express = require('express');
const { login, me, forgotPassword, resetPassword, logout } = require('../controllers/auth.controller');
const { jwtAuthentication } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.get('/me', jwtAuthentication, me);
router.post('/forgotpassword', forgotPassword);
router.patch('/resetpassword', jwtAuthentication, resetPassword);
router.post('/logout', jwtAuthentication, logout);

module.exports = router;