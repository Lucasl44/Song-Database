const Music = require("../models/index");

const allMusic = async () => await Music.findAll({});

const addMusic = async (music) => await Music.create(music);

const deleteAllMusic = async () => await Music.destroy({truncate: true});

const oneMusic = async (id) => await Music.findOne({where: {id}});

const editMusic = async (id, title, artist, album) => {
    const song = await Music.findOne({where: {id}});
    return Music.update({title: title || song.title, artist: artist || song.artist, album: album || song.album}, {where: {id}})
};

const deleteMusic = async (id) => await Music.destroy({where: {id}});


module.exports = {
    allMusic,
    addMusic,
    deleteAllMusic,
    oneMusic,
    editMusic,
    deleteMusic
}