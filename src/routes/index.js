const homeRouter = require('./home.js');
const coursesRouter = require('./courses.js');
const meRouter = require('./me.js');

function routes(app) {
    app.use('/courses', coursesRouter);
    app.use('/me', meRouter);
    app.use('/', homeRouter);
}

module.exports = routes;
