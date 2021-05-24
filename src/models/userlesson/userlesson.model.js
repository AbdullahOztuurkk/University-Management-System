exports.UserLesson = class {
    constructor(object) {
        Object.assign(this, object);
    }

    id;
    userId;
    user;
    lessonId;
    lesson;
    startYear;
    endYear;
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


    defineYearAndSesion() {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();

        switch (currentMonth) {
            case (currentMonth >= 1 && currentMonth <= 5):
                this.season = 'SPRING';
                this.startYear = new Date(currentYear - 1);
                this.startYear = new Date(currentYear);
                break;
            case (currentMonth >= 6 && currentMonth <= 8):
                this.season = 'SUMMER';
                this.startYear = new Date(currentYear - 1);
                this.startYear = new Date(currentYear);
                break;
            case (currentMonth >= 9 && currentMonth <= 12):
                this.season = 'AUTUMN';
                this.startYear = new Date(currentYear);
                this.startYear = new Date(currentYear + 1);
                break;

        }
    }
}