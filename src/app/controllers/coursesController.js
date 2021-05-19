const Course = require('../models/Course.js');
const { mongooseToObject } = require('../../util/mongoose.js');

class CoursesController {
    // [GET] /courses/:slug
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

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create', { title: 'Đăng khóa học' });
    }

    // [POST] /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
        const course = new Course(formData);
        course.save().then(res.redirect('/')).catch(next);
    }

    // [GET] /courses/:id/edit
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

    // [PUT] /courses/:id
    update(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
        formData.updatedTime = Date.now();
        Course.updateOne({ _id: req.params.id }, formData)
            .then(res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(res.redirect('/me/deleted/courses'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force-delete
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(res.redirect('/me/deleted/courses'))
            .catch(next);
    }

    // [POST] /courses/handle-multi-actions
    multiAction(req, res, next) {
        // res.send(req.body);
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.coursesID } })
                    .then(res.redirect('/me/stored/courses'))
                    .catch(next);
                break;
            case 'restore':
                Course.restore({ _id: { $in: req.body.coursesID } })
                    .then(res.redirect('/me/deleted/courses'))
                    .catch(next);
                break;
            case 'force-delete':
                Course.deleteOne({ _id: { $in: req.body.coursesID } })
                    .then(res.redirect('/me/deleted/courses'))
                    .catch(next);
                break;
            default:
                res.status(400).send('error');
        }
    }
}

module.exports = new CoursesController();
