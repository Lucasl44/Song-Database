require("dotenv").config();

const express = require("express");
const { connection } = require("./connection");
const Music = require("./models/index");
const Playlist = require("./models/playlist");
const musicRouter = require("./routes/index");
const playlistRouter = require("./routes/playlist")

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.status(200).json({msg: "Worked!"}));
app.use("/index", musicRouter);
app.use("/playlist", playlistRouter);

app.listen(process.env.HTTP_PORT || 80, () => {
    connection.authenticate();
    Music.sync({alter: true});
    Playlist.sync({alter: true});
})
