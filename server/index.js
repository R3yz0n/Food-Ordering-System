const http = require('http');
const port = 4000;
const app = require('./app')
const server = http.createServer(app);
const { sequelize } = require('./models');
require('dotenv').config({ path: '.env.production' });





server.listen(port, (req, res) => {
    console.log(`Server running at ${port} port !`)
});
// console.log(process.env.username);


sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error.message);
    });
