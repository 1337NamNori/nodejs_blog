const Course = require('../models/Course.js');
const { multipleMongooseToObject } = require('../../util/mongoose.js');

class MeController {
    // [GET] me/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render('me/stored-courses', {
                    title: 'Khóa học của tôi',
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    // [GET] me/deleted/courses
    deletedCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/deleted-courses', {
                    title: 'Thùng rác',
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
