const express = require("express");
const {
	getLessons,
	getLesson,
	UpdateLesson,
	DeleteLesson,
	CreateLesson,
} = require("../controllers/lesson.controller");
const { jwtAuthentication } = require("../middleware/auth");
const { createValidator } = require("express-joi-validation");
const lessonCreateDto = require("../models/lesson/dtos/lesson-create.dto");

const router = express.Router();

router
	.route("/")
	.get(getLessons)
	.post(lessonCreateDto, jwtAuthentication, CreateLesson);
router
	.route("/:id")
	.get(getLesson)
	.patch(jwtAuthentication, UpdateLesson)
	.delete(jwtAuthentication, DeleteLesson);

module.exports = router;
