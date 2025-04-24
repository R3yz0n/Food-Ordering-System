require("dotenv").config();

module.exports = {
    development: {
        uri: process.env.DB_URI_DEV,
        username: process.env.DB_USERNAME_DEV,
        password: process.env.DB_PASSWORD_DEV,
        database: process.env.DB_DATABASE_DEV,
        dialect: "mysql",
        port: process.env.DB_PORT_DEV,
        host: process.env.DB_HOST_DEV,
    },
    production: {
        username: process.env.DB_USERNAME_PROD,
        password: process.env.DB_PASSWORD_PROD,
        database: process.env.DB_DATABASE_PROD,
        host: process.env.DB_HOST_PROD,
        dialect: "mysql",
        port: process.env.DB_PORT_PROD,
    },
};
