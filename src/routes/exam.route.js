const express = require('express');
const { getAll, create, getById, updateById, deleteById } = require('../controllers/exam.controller');
const { jwtAuthentication, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });


router.route('/')
    .get(jwtAuthentication, authorize('ADMIN', 'TEACHER'), getAll)
    .post(jwtAuthentication, authorize('TEACHER'), create);
router.route('/:id')
    .get(jwtAuthentication, getById)
    .patch(jwtAuthentication, authorize('TEACHER'), updateById)
    .delete(jwtAuthentication, authorize('TEACHER'), deleteById);


module.exports = router;