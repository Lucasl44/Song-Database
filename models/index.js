const { DataTypes } = require("sequelize");
const { connection } = require("../connection");

const Music = connection.define("Music", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    artist: {
        type: DataTypes.STRING,
        allowNull: false
    },

    album: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    indexes: [{unique: true, fields: ["title"]}]
});

module.exports = Music;