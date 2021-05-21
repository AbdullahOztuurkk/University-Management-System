const constants = require('../../constants/constants');

exports.Faculty = class {
    constructor(object) {
        Object.assign(this, object);
    }
    id;
    name;
    slugifyName;
    departments; // Relation field
}
