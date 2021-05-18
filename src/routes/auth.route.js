const express = require('express');
const { login, me } = require('../controllers/auth.controller');
const { jwtAuthentication } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.get('/me', jwtAuthentication, me);

module.exports = router;