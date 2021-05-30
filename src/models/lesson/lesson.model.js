const { default: slugify } = require("slugify");

exports.Lesson = class {
    constructor(object) {
        Object.assign(this, object);

        this.slugifyName = slugify(this.name, { replacement: '-', lower: true });
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