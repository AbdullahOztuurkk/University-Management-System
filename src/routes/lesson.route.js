const express = require('express');
const { getAll, getById, create, deleteById, updateById } = require('../controllers/lesson.controller');
const { jwtAuthentication, authorize } = require('../middleware/auth');
const updateDto = require('../models/lesson/dtos/lesson-update-dto');
const createDto = require('../models/lesson/dtos/lesson-create.dto');


const router = express.Router();

// Only admin can access and manage faculties

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