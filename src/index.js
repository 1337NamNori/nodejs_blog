const express = require('express');
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');


const app = express();
const port = 3000;

// HTTP Logger
app.use(morgan('combined'));

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Template Engine
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/resources/views'));

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

// Listen port 3000
app.listen(port, () => console.log('listening on port ' + port));