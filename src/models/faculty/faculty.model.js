const { default: slugify } = require("slugify");

exports.Faculty = class {
    constructor(object) {
        Object.assign(this, object);

        this.slugifyName = slugify(this.name, { replacement: '-', lower: true });
    }
    id;
    name;
    slugifyName;
    departments;
}
