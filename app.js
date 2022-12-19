// load package
const express = require('express')

// setting server
const PORT = process.env.PORT || 3000
const app = express()

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
