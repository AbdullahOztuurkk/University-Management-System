exports.Class = class {
    constructor(object) {
        Object.assign(this, object);
    }
    id;
    session;
    year;
    status;
    lessonId;
    lesson;
    teacherId;
    teacher;
    studentClasses;

    fillYearAndSession() {
        let currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        switch (currentMonth) {
            case currentMonth >= 1 && currentMonth <= 5:
                this.year = `${currentYear - 1}-${currentYear}`;
                this.session = 'SPRING';
            case currentMonth >= 6 && currentMonth <= 8:
                this.year = `${currentYear - 1}-${currentYear}`;
                this.session = 'SUMMER';
            case currentMonth >= 9 && currentMonth <= 12:
                this.year = `${currentYear}-${currentYear + 1}`;
                this.session = 'AUTUMN';
        }
    }
}