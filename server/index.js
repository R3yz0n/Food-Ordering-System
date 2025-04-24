require("dotenv").config();
const http = require("http");
const port = process.env.PORT || 4000;
const app = require("./app");
const server = http.createServer(app);
const config = require("./config/config");
const { sequelize } = require("./models");
const { isColString } = require("sequelize/lib/utils");

// Log current environment configuration
// const env = process.env.NODE_ENV || "development";
// console.log(process.env.NODE_ENV);
// console.log("Environment:", env);
// console.log("Database Configuration:", config[env]);

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

// Database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
    // return sequelize.sync(); // it logs all the tables in the database
  })
  .then(() => {
    console.log("Database models synchronized successfully.");
  })
  .catch((error) => {
    console.error("Database Connection Error:");
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    process.exit(1); // Exit process on database connection failure
  });
