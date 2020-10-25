const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

app.use(bacBaoVe);

function bacBaoVe(req, res, next) {
    if (['vevip', 'vethuong'].includes(req.query.ve)) {
        req.face = 'abc';
        return next();
    }
    res.status(403).json({
        message: 'access denied',
    });
}

//HTTP logger
//app.use(morgan('combined'));
//Template Engine
app.engine(
    'hbs',
    exphbs({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

//Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
