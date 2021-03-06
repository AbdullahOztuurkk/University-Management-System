const jwt = require('jsonwebtoken');
const constants = require('../../constants/constants');
const bcyrpt = require('bcryptjs');
const { default: slugify } = require('slugify');

exports.User = class {
    constructor(object) {
        Object.assign(this, object);
    }
    id;
    firstName;
    lastName;
    role;
    status;
    email;
    pwd;
    pwdHash;
    pwdSalt;
    userLessons; // relation field;
    userDepartments; // relation field;
    departmentId; // To register at initialCreate

    hashPassword() {
        this.pwdSalt = bcyrpt.genSaltSync(10);
        this.pwdHash = bcyrpt.hashSync(this.pwd, this.pwdSalt);
    }
    async matchPassword(pwd) {
        const pwdHash = await bcyrpt.hash(pwd, this.pwdSalt);
        if (pwdHash === this.pwdHash) {
            return true;
        }
        return false;
    }
    getSignedJwt() {
        return jwt.sign({ id: this.id }, constants.JWT_SECRET, {
            expiresIn: constants.JWT_EXPIRE,
        });
    }

    assignInformations() {
        this.email = slugify(String(this.firstName + this.lastName + this.role + this.id + '@university.com'), { lower: true });
        this.status = 'ACTIVE';
    }
}