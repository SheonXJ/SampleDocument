// load package
const express = require('express')
const exhbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const handlebarsHelper = require('./helper/handlebars-helper')
const { pages } = require('./routes/index')

// load env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// load database(mongodb)
require('./config/mongoose')

// setting server
const PORT = process.env.PORT || 3000
const app = express()

// setting template engine
app.engine('hbs', exhbs.engine({
  defaultLayout: 'main',
  extname: 'hbs',
  helpers: handlebarsHelper
}))
app.set('view engine', 'hbs')
// setting middleware
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use('/', pages)

// start server
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
