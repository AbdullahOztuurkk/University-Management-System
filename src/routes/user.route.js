const express = require("express");
const {
	create,
	deleteById,
	getAll,
	getById,
	getJoinedLessons,
	joinOpenedLesson,
	leaveOpenedLesson,
	getStudents,
	getTeachers,
	updateById,
} = require("../controllers/user.controller");
const { jwtAuthentication, authorize } = require("../middleware/auth");
const createUserLessonDto = require("../models/userlesson/dtos/create-userlesson.dto");

const router = express.Router();

// Only admin can manage users

router.use(jwtAuthentication);

router
	.route("/lessons")
	.get(authorize("STUDENT"), getJoinedLessons)
	.post(authorize("STUDENT"), joinOpenedLesson)
	.delete(authorize("STUDENT"), leaveOpenedLesson);

router.route("/teachers", getTeachers);
router.route("/students", getStudents);

router
	.route("/:id")
	.get(getById)
	.patch(authorize("ADMIN"), updateById)
	.delete(authorize("ADMIN"), deleteById);
router
	.route("/")
	.post(authorize("ADMIN"), createUserLessonDto, create)
	.get(getAll);

module.exports = router;