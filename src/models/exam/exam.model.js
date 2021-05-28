const constants = require('../../constants/constants');

exports.Exam = class {
    constructor(object) {
        Object.assign(this, object);
    }
    type;
    score;
    announcementDate;
    userLessonId;
    UserLesson; // Relation field
}
