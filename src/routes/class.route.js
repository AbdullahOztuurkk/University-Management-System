const express = require('express');
const { create, getAll, getById, updateById, deleteById, getAllStudents } = require('../controllers/class.controller');
const { jwtAuthentication, authorize } = require('../middleware/auth');
const updateDto = require('../models/class/dtos/class-update.dto');
const createDto = require('../models/class/dtos/class-create.dto');
const classFilteringDto = require('../models/class/dtos/class-filtering.dto');


const router = express.Router();

router.route('/')
    .get(jwtAuthentication, authorize('ADMIN'), classFilteringDto, getAll)
    .post(jwtAuthentication, authorize('ADMIN'), createDto, create);

router.route('/:id')
    .get(jwtAuthentication, authorize('ADMIN'), getById)
    .patch(jwtAuthentication, authorize('ADMIN'), updateDto, updateById)
    .delete(jwtAuthentication, authorize('ADMIN'), deleteById);

router.route('/:id/students')
    .get(jwtAuthentication, authorize('ADMIN'), getAllStudents)

module.exports = router;