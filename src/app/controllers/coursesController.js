const Course = require('../models/Course.js');
const { mongooseToObject } = require('../../util/mongoose.js');

class CoursesController {
    index(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) =>
                res.render('courses/show', {
                    title: mongooseToObject(course).name,
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }
}

module.exports = new CoursesController();
