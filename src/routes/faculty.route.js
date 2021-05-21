const express = require('express');
const { getById, updateById, deleteById, create, getAll } = require('../controllers/faculty.controller');
const { jwtAuthentication, authorize } = require('../middleware/auth');
const createDto = require('../models/faculty/dtos/faculty-create.dto');
const updateDto = require('../models/faculty/dtos/faculty-update.dto');


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