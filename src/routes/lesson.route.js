const express = require("express");
const {
	getAll,
	getById,
	create,
	deleteById,
	updateById,
	getAllActive,
	open,
} = require("../controllers/lesson.controller");
const { jwtAuthentication, authorize } = require("../middleware/auth");
const updateDto = require("../models/lesson/dtos/lesson-update-dto");
const createDto = require("../models/lesson/dtos/lesson-create.dto");
const createUserLessonDto = require("../models/userlesson/dtos/create-userlesson.dto");

const router = express.Router();

// Only admin can access and manage lessons

router.use(jwtAuthentication);
router.use(authorize("ADMIN"));

router.route("/").get(getAll);

router
	.route("/:id")
	.post(createDto, create)
	.get(getById)
	.patch(updateDto, updateById)
	.delete(deleteById);

module.exports = router;
