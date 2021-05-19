const Course = require('../models/Course.js');
const { multipleMongooseToObject } = require('../../util/mongoose.js');

class MeController {
    // [GET] me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        if (res.locals._sort.enabled) {
            courseQuery = courseQuery.sort({
                [res.locals._sort.field]: res.locals._sort.type,
            });
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    title: 'Khóa học của tôi',
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                    count: multipleMongooseToObject(courses).length > 0,
                }),
            )
            .catch(next);
    }

    // [GET] me/deleted/courses
    deletedCourses(req, res, next) {
        let courseQuery = Course.findDeleted({});

        if (res.locals._sort.enabled) {
            courseQuery = courseQuery.sort({
                [res.locals._sort.field]: res.locals._sort.type,
            });
        }

        courseQuery
            .then((courses) =>
                res.render('me/deleted-courses', {
                    title: 'Thùng rác',
                    courses: multipleMongooseToObject(courses),
                    count: multipleMongooseToObject(courses).length > 0,
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
