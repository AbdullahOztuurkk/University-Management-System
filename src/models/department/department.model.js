const { default: slugify } = require("slugify");
const constants = require("../../constants/constants");

exports.Department = class {
    constructor(object) {
        Object.assign(this, object);

        this.slugifyName = slugify(this.name, { replacement: '-', lower: true });
    }
    id;
    name;
    slugifyName;
    facultyId;
    faculty;
    lessons;
    studentDepartments;
    teacherDepartments;
}