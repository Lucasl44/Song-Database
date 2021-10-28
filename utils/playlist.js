const Playlist = require("../models/playlist");

const allPlaylists = async () => await Playlist.findAll({});

const addPlaylist = async (playlist) => await Playlist.create(playlist);

const deleteAllPlaylists = async () => await Playlist.destroy({truncate: true});

const onePlaylist = async (id) => await Playlist.findOne({where: {id}});

const editPlaylist = async (id, name) => {
    const list = await Playlist.findOne({where: {id}});
    return Playlist.update({name: name || list.name}, {where: {id}})
};

const deletePlaylist = async (id) => await Playlist.destroy({where: {id}});




module.exports = {
    allPlaylists,
    addPlaylist,
    deleteAllPlaylists,
    onePlaylist,
    editPlaylist,
    deletePlaylist
};