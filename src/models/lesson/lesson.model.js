const constants = require('../../constants/constants');

exports.Lesson = class {
    constructor(object) {
        Object.assign(this, object);
    }
    id;
    name;
    credit;
    code;
    grade;
    status;
    departmentId;
    department; // Relation field
    userLessons; // Relation field
}