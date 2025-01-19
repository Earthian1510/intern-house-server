const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(cors())

const initializeDatabase = require('./db/db.connection')
const jobRoute = require('./routes/job.route')

initializeDatabase()

app.get('/', async (req, res) => {
    res.send('Hello, Express!');
})

app.use('/', jobRoute)

PORT = 3000 || process.env.PORT 
app.listen(PORT, () => {
    console.log(`--------------------------------------------`)
    console.log(`Server running on port http://127.0.0.1:${PORT}`)
    console.log(`--------------------------------------------`)
})