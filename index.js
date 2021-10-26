require("dotenv").config();

const express = require("express");
const passport = require("passport");
const app = express();

const connection = require("./connection");
const User = require("./models/user");
const userRouter = require("./routes/user");

app.use(express.json());
app.use(passport.initialize());

app.use("/users", userRouter);

app.listen(process.env.HTTP_PORT || 80, () => {
    connection.authenticate();
    User.sync({alter: true});
    console.log("App Online");
});