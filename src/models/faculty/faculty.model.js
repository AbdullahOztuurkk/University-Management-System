const { default: slugify } = require("slugify");

exports.Faculty = class {
    constructor(object) {
        Object.assign(this, object);
    }
    id;
    name;
    slugifyName;
    departments;
}
