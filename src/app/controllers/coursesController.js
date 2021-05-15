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
    create(req, res, next) {
        res.render('courses/create', { title: 'Đăng khóa học' });
    }
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
        const course = new Course(formData);
        course.save().then(res.redirect('/')).catch(next);
    }
}

module.exports = new CoursesController();
