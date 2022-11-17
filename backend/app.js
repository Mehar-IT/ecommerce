const express = require("express");
const app = express();
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const errorMiddleWare = require("./middleware/error");
const notFoundError = require("./middleware/404");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use(notFoundError);
app.use(errorMiddleWare);

module.exports = app;
