// load package
const express = require('express')

// load env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// load database(mongodb)
require('./config/mongoose')

// setting server
const PORT = process.env.PORT || 3000
const app = express()

// setting route
app.get('/', (req, res) => {
  res.send('hello')
})

// start server
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
