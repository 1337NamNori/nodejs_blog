const homeRouter = require('./home.js');

function routes(app) {
    app.use('/', homeRouter);
}

module.exports = routes;
