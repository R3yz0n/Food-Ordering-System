const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { sequelize } = require("./models");

const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/items");
const fileRoutes = require("./routes/files");
const userRoutes = require("./routes/users");
const cartRoutes = require("./routes/cart");
const latestRoutes = require("./routes/latest");
const orderRoutes = require("./routes/order");
const reportRoutes = require("./routes/report");
const paymentRoutes = require("./routes/payment");

app.use(cors());

// Stripe webhook needs raw body - process before JSON body parser
app.post(
    "/payment/webhook",
    express.raw({ type: "application/json" }),
    (req, res, next) => {
        req.rawBody = req.body;
        express.json()(req, res, next);
    },
);

app.use(express.json());
app.use(bodyParser.json());

app.get("/prod", (req, res) => {
    res.send("hello prod");
});
app.use("/auth", authRoutes);
app.use("/file", fileRoutes);
app.use("/item", itemRoutes);
app.use("/user", userRoutes);
app.use("/cart", cartRoutes);
app.use("/latest", latestRoutes);
app.use("/order", orderRoutes);
app.use("/report", reportRoutes);
app.use("/payment", paymentRoutes);

// sequelize
//     .sync({ force: true })
//     .then((result) => {
//         console.log("migration successful");
//     })
//     .catch((err) => {
//         console.log(err.message);
//     });

module.exports = app;
