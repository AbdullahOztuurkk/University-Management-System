const express = require('express');
const { getAll,create,deleteById,getById,updateById} = require('../controllers/exam.controller');
const { jwtAuthentication, authorize } = require('../middleware/auth');
const createDto = require('../models/exam/dtos/exam-create.dto');

const router = express.Router();

// All Users can get lessons
// Only Teacher can manipulate lessons

router.use(jwtAuthentication);

router.route('/:id')
    .get(authorize('STUDENT'),getById)
    .patch(authorize('TEACHER'), updateById)
    .delete(authorize('TEACHER'),deleteById);
router.route('/')
    .post(authorize('TEACHER'),createDto, create)
    .get(authorize('STUDENT'),getAll);

module.exports = router;