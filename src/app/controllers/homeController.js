const Course = require('../models/Course.js');
const { multipleMongooseToObject } = require('../../util/mongoose.js');

class HomeController {
    index(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render('home', {
                    title: 'Trang Chủ',
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new HomeController();
