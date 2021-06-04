const express = require('express');
const { create } = require('../controllers/teacher.controller');
const { jwtAuthentication, authorize } = require('../middleware/auth');
const createDto = require('../models/user/dtos/teacher/teacher-create-dto');

const router = express.Router({ mergeParams: true });

router.route('/').post(jwtAuthentication, authorize('ADMIN'), createDto, create);

module.exports = router;