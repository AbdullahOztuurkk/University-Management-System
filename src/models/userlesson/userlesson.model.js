exports.UserLesson = class {
    constructor(object) {
        Object.assign(this, object);
    }

    id;
    userId;
    user;
    lessonId;
    lesson;
    seasonYear;
    season;
    result;
    average;
    exams;

    calculateAverage(midExam, finalOrMakeUpExam) {
        this.average = (midExam * (40 / 100)) + (finalOrMakeUpExam * (40 / 100));

        if (this.average < 50 || finalOrMakeUpExam < 50) {
            this.result = 'FAILED';
        }
        else {
            this.result = 'PASSED';
        }
    }


    defineYearAndSeason() {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();

        switch (currentMonth) {
            case (currentMonth >= 1 && currentMonth <= 5):
                this.season = 'SPRING';
                this.seasonYear = String((currentYear - 1) + '-' + (currentYear));
                break;
            case (currentMonth >= 6 && currentMonth <= 8):
                this.season = 'SUMMER';
                this.seasonYear = String((currentYear - 1) + '-' + (currentYear));
                break;
            case (currentMonth >= 9 && currentMonth <= 12):
                this.season = 'AUTUMN';
                this.seasonYear = String((currentYear) + '-' + (currentYear + 1));
                break;

        }
    }
}