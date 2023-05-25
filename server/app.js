const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const { sequelize } = require('./models');

const authRoutes = require('./routes/auth')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())





app.use('/auth', authRoutes);

app.use('/dashboard')





// sequelize.sync({ force: true }).then((result) => {;
//     console.log("migration successful");
// }).catch(err => {;
//     console.log(err);;
// });

module.exports = app;