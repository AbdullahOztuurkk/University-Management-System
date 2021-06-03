const { default: slugify } = require("slugify");

exports.Lesson = class {
    constructor(object) {
        Object.assign(this, object);
    }
    id;
    name;
    slugifyName;
    credit;
    code;
    grade;
    departmentId;
    department;
    classes;
}