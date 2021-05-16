const Course = require('../models/Course.js');
const { mongooseToObject } = require('../../util/mongoose.js');

class CoursesController {
    // [GET] /course
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

    // [GET] /course/create
    create(req, res, next) {
        res.render('courses/create', { title: 'Đăng khóa học' });
    }

    // [POST] /course/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
        const course = new Course(formData);
        course.save().then(res.redirect('/')).catch(next);
    }

    // [GET] /course/:id/edit
    edit(req, res, next) {
        Course.findOne({ _id: req.params.id })
            .then((course) =>
                res.render('courses/edit', {
                    title: 'Sửa khóa học',
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [PUT] /course/:id
    update(req, res, next) {
        const formData = req.body;
        formData.updatedTime = Date.now();
        Course.updateOne({ _id: req.params.id }, formData)
            .then(res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [DELETE] /course/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [PATCH] /course/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(res.redirect('/me/deleted/courses'))
            .catch(next);
    }

    // [DELETE] /course/:id/force-delete
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(res.redirect('/me/deleted/courses'))
            .catch(next);
    }
}

module.exports = new CoursesController();
