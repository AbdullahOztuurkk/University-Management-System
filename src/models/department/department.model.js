const constants = require("../../constants/constants");

exports.Department = class {
    constructor(object) {
        Object.assign(this, object);
    }
    id;
    name;
    slugifyName;
    facultyId;
    faculty; // Relation field
    lessons; // Relation field
    userDepartments; // Relation field

}