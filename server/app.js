const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();

const authRoutes = require('./routes/auth')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())





app.use('/auth', authRoutes);

module.exports = app;