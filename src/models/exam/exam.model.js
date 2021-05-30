const { client } = require("../../config/prisma-config");

exports.Exam = class {
    constructor(object) {
        Object.assign(this, object);
    }
    id;
    type;
    score;
    studentClassId;
    studentClass;

    // Rabbit mq
    static async calculateAverage(studentClassId) {
        const studentClass = await client.studentClasses.findUnique({
            where: {
                id: studentClassId,
            },
            select: {
                id: true,
                exams: {
                    select: {
                        id: true,
                        type: true,
                        score: true,
                    }
                }
            }
        });

        let [result, average, letterScore] = [null, null, null];

        if (studentClass.exams.length < 2) {
            result = 'NORESULT';
            average = 0.00;
            letterScore = 0.00;
        }
        else {

            let midterm = studentClass.exams.find(exam => exam.type === 'MIDTERM').score;
            let final = studentClass.exams.find(exam => exam.type === 'MAKEUP').score;
            if (!final) {
                final = studentClass.exams.find(exam => exam.type === 'FINAL').score;
            }

            average = ((midterm * 3) + (final * 7)) / 10;

            if (final < 50) {
                result = 'FAILED';
                letterScore = 0.00;
            }
            else {
                switch (average) {
                    case average <= 30:
                        letterScore = 0.00;
                        result = 'FAILED';
                        break;
                    case average <= 50:
                        letterScore = 1.50;
                        result = 'FAILED';
                        break;
                    case average <= 55:
                        letterScore = 2.00
                        result = 'PASSED';
                        break;
                    case average <= 65:
                        letterScore = 2.50
                        result = 'PASSED';
                        break;
                    case average <= 75:
                        letterScore = 3.00;
                        result = 'PASSED';
                        break;
                    case average <= 85:
                        letterScore = 3.50;
                        result = 'PASSED';
                        break;
                    case average <= 100:
                        letterScore = 4.00;
                        result = 'PASSED';
                        break;
                }
            }
        }
        await client.studentClasses.update({
            where: {
                id: studentClassId,
            },
            data: {
                average: average,
                letterScore: letterScore,
                result: result,
            },
        });
    }
}