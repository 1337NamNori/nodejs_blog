const express = require('express')
const morgan = require('morgan')
const exphbs  = require('express-handlebars');
const app = express()
const port = 3000
//HTTP logger
app.use(morgan('combined'))
//Template Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})