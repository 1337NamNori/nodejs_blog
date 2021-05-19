const express = require('express');
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

const route = require('./routes/index.js');
const db = require('./config/db/index.js');

const SortMiddleware = require('./app/middlewares/SortMiddleware.js');

const app = express();
const port = 3000;

// HTTP Logger
// app.use(morgan('combined'));

// Connect MongoDB
db.connect();

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Template Engine
app.engine(
    'hbs',
    exphbs({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sort: (field, sort) => {
                const sortType = field === sort.field ? sort.type : 'default';
                const icons = {
                    default: 'fas fa-sort',
                    desc: 'fas fa-sort-amount-down',
                    asc: 'fas fa-sort-amount-down-alt',
                };
                const types = {
                    default: 'desc',
                    desc: 'asc',
                    asc: 'desc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&field=${field}&type=${type}">
                            <i class="${icon}"></i>
                        </a>`;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/resources/views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Custom middleware
app.use(SortMiddleware);

// Routes
route(app);

// Listen port 3000
app.listen(port, () =>
    console.log('listening on port ' + port + ` http://localhost:${port}`),
);
