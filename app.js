require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3001

// static routes
app.use(express.static(path.join(__dirname, 'front-end/build')))
app.use('/', function (req, res) {
	return res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`)
})
