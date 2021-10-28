const { DataTypes } = require("sequelize");
const { connection } = require("../connection");

const Playlist = connection.define("Playlist", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    indexes: [{unique: true, fields: ["name"]}]
});

module.exports = Playlist;