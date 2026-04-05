require("dotenv").config();

const poolConfig = {
    max: 10, // Maximum number of connections in pool
    min: 2, // Minimum number of connections in pool
    acquire: 30000, // Maximum time (ms) to acquire connection before throwing error
    idle: 10000, // Maximum time (ms) a connection can be idle before being released
};

module.exports = {
    development: {
        username: process.env.DB_USERNAME_DEV,
        password: process.env.DB_PASSWORD_DEV,
        database: process.env.DB_DATABASE_DEV,
        dialect: "mysql",
        port: process.env.DB_PORT_DEV,
        host: process.env.DB_HOST_DEV,
        pool: poolConfig,
        logging: false, // Disable SQL logging in development
    },
    production: {
        username: process.env.DB_USERNAME_PROD,
        password: process.env.DB_PASSWORD_PROD,
        database: process.env.DB_DATABASE_PROD,
        host: process.env.DB_HOST_PROD,
        dialect: "mysql",
        port: process.env.DB_PORT_PROD,
        pool: poolConfig,
        logging: false,
    },
};
