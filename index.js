require("dotenv").config();

const express = require("express");
const { connection } = require("./connection");
const Music = require("./models/index");
const router = require("./routes/index");

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.status(200).json({msg: "Worked!"}));
app.use("/index", router);

app.listen(process.env.HTTP_PORT || 80, () => {
    connection.authenticate();
    Music.sync({alter: true});
})
