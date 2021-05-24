const express = require('express');
const { getAll, getById, create, deleteById, updateById } = require('../controllers/department.controller');
const { jwtAuthentication, authorize } = require('../middleware/auth');
const updateDto = require('../models/department/dtos/department-update-dto');
const createDto = require('../models/department/dtos/department-create-dto');


const router = express.Router({ mergeParams: true });

// Only admin can access and manage departments

router.use(jwtAuthentication);
router.use(authorize('ADMIN'));

router.route('/:id')
    .get(getById)
    .patch(updateDto, updateById)
    .delete(deleteById);
router.route('/')
    .post(createDto, create)
    .get(getAll);

module.exports = router;