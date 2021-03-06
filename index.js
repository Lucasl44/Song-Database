require("dotenv").config();

const express = require("express");
const passport = require("passport");
const app = express();
const cors = require("cors");


const connection = require("./connection");
const { verifyStrategy, registerStrategy, loginStrategy } = require("./middleware/auth");
const User = require("./models/user");
const userRouter = require("./routes/user");
const Music = require("./models/index");
const Playlist = require("./models/playlist");
const musicRouter = require("./routes/index");
const playlistRouter = require("./routes/playlist")

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use("/index", musicRouter);
app.use("/playlist", playlistRouter);
passport.use("register", registerStrategy);
passport.use("login", loginStrategy);
passport.use(verifyStrategy);
app.use("/users", userRouter);
app.get("*", (req, res) => {
    res.status(404).json({msg: "error"})
});

app.listen(process.env.PORT || process.env.HTTP_PORT || 80, () => {
    connection.authenticate();
    User.sync({alter: true});
    Music.sync({alter: true});
    Playlist.sync({alter: true});
    console.log("App Online");
});

