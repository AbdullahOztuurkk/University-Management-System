const express = require('express');
const { getAll, create, getById, updateById, deleteById } = require('../controllers/exam.controller');
const { jwtAuthentication, authorize } = require('../middleware/auth');
const filteringDto = require('../models/exam/dtos/exam-filtering.dto');


const router = express.Router({ mergeParams: true });

router.route('/')
    .get(jwtAuthentication, authorize('ADMIN', 'TEACHER'), filteringDto, getAll)
    .post(jwtAuthentication, authorize('TEACHER'), create);
router.route('/:id')
    .get(jwtAuthentication, getById)
    .patch(jwtAuthentication, authorize('TEACHER'), updateById)
    .delete(jwtAuthentication, authorize('TEACHER'), deleteById);


module.exports = router;