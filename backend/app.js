const express = require("express");
const app = express();
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const errorMiddleWare = require("./middleware/error");
const notFoundError = require("./middleware/404");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });
// app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" }));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use(notFoundError);
app.use(errorMiddleWare);

module.exports = app;
