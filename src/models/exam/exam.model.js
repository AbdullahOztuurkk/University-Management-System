const constants = require('../../constants/constants');

exports.Exam = class {
    constructor(object) {
        Object.assign(this, object);
    }
    id;
    type;
    score;
    announcementDate;
    userLessonId;
    UserLesson; // Relation field
}
