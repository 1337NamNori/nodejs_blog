const homeRouter = require('./home.js');
const coursesRouter = require('./courses.js');

function routes(app) {
    app.use('/courses', coursesRouter);
    app.use('/', homeRouter);
}

module.exports = routes;
