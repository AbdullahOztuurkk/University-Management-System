const constants = require('../../constants/constants');

exports.Lesson = class {
    constructor(object) {
        Object.assign(this, object);
    }
    id;
    name;
    slugifyName;
    departments; // Relation field
}
