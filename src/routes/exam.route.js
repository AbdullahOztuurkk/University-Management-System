const express = require('express');
const { getAll,create,deleteById,getById,updateById} = require('../controllers/exam.controller');
const { jwtAuthentication, authorize } = require('../middleware/auth');
const createDto = require('../models/exam/dtos/exam-create.dto');

const router = express.Router();

// All Users can get lessons
// Only Teacher can manipulate lessons

router.use(jwtAuthentication);

router.route('/:id')
    .get(getById)
    .patch(authorize('TEACHER','ADMIN'), updateById)
    .delete(authorize('TEACHER','ADMIN'),deleteById);
router.route('/')
    .post(authorize('TEACHER','ADMIN'),createDto, create)
    .get(getAll);

module.exports = router;