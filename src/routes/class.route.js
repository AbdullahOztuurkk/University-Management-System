const express = require('express');
const { create, getAll, getById, updateById, deleteById, getAllOpened } = require('../controllers/class.controller');
const { jwtAuthentication, authorize } = require('../middleware/auth');
const updateDto = require('../models/class/dtos/class-update.dto');
const createDto = require('../models/class/dtos/class-create.dto');


const router = express.Router();

router.route('/')
    .get(getAll, jwtAuthentication, authorize('ADMIN'))
    .post(createDto, create, jwtAuthentication, authorize('ADMIN'));

router.route('/:id')
    .get(getById, jwtAuthentication, authorize('ADMIN'))
    .patch(updateDto, updateById, jwtAuthentication, authorize('ADMIN'))
    .delete(deleteById, jwtAuthentication, authorize('ADMIN'));

router.route(':departmentId/opened')
    .get(getAllOpened, jwtAuthentication, authorize('ADMIN', 'STUDENT'));
module.exports = router;