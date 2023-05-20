const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())




console.log(1);




module.exports = app;