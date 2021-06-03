const jwt = require('jsonwebtoken');
const constants = require('../../constants/constants');
const bcyrpt = require('bcryptjs');
const { default: slugify } = require('slugify');
const { client } = require('../../config/prisma-config');

exports.User = class {
    constructor(object) {
        Object.assign(this, object);
    }
    id;
    firstName;
    lastName;
    email;
    role;
    pwd;
    pwdHash;
    pwdSalt;
    teacherField;
    studentField;
    studentDepartments;
    teacherDepartments;
    classes;
    studentClasses;

    // Rabbit mq
    static async calculateGno(studentClassId) {
        const student = await client.users.findFirst({
            where: {
                studentClasses: {
                    some: {
                        id: studentClassId,
                    }
                }
            },
            select: {
                id: true,
                studentClasses: {
                    where: {
                        result: {
                            not: 'NORESULT',
                        }
                    },
                    select: {
                        letterScore: true,
                        class: {
                            select: {
                                lesson: {
                                    select: {
                                        credit: true,
                                    },
                                }
                            }
                        }
                    }
                }
            }
        });

        let [totalCredits, takenCreditScores, gno] = [0, 0, 0.00]

        student.studentClasses.forEach(studentClass => {
            totalCredits += studentClass.class.lesson.credit;
            takenCreditScores += (studentClass.class.lesson.credit * studentClass.letterScore);
        });

        if (!totalCredits === 0 || !takenCredits === 0) {
            gno = (takenCreditScores / totalCredits);
        }

        await client.studentFields.update({
            where: {
                studentId: student.id
            },
            data: {
                gno: gno,
            }
        });
    }

    hashPassword() {
        console.log(`pwd : ${this.pwd}`);
        this.pwdSalt = bcyrpt.genSaltSync(10);
        console.log(`Salt: ${this.pwdSalt}`);
        this.pwdHash = bcyrpt.hashSync(this.pwd, this.pwdSalt);
        console.log(`Hash: ${this.pwdHash}`);
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