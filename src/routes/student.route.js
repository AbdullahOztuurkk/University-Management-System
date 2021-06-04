const express = require('express');
const { create } = require('../controllers/student.controller');
const { jwtAuthentication, authorize } = require('../middleware/auth');
const createDto = require('../models/user/dtos/student/student-create.dto');

const router = express.Router({ mergeParams: true });

router.route('/').post(jwtAuthentication, authorize('ADMIN'), createDto, create);

module.exports = router;