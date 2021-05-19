const jwt = require('jsonwebtoken');
const constants = require('../../constants/constants');
const bcyrpt = require('bcryptjs');

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

    async hashPassword() {
        console.log(this.pwd);
        this.pwdSalt = await bcyrpt.genSalt(10);
        console.log(this.pwdSalt);
        this.pwdHash = await bcyrpt.hash(this.pwd.toString(), this.pwdSalt);
        console.log(this.pwdHash);
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
}