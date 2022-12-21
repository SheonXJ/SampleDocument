// load package
const express = require('express')
const exhbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const path = require('path')
const session = require('express-session')
const usePassport = require('./config/passport')
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
// eslint-disable-next-line n/no-path-concat
app.use('/stylesheets', express.static(path.join(__dirname + '/stylesheets')))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
usePassport(app)
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})
app.use('/', pages)

// start server
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
