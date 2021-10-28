const router = require("express").Router();
const { allPlaylists, addPlaylist, deleteAllPlaylists, onePlaylist, editPlaylist, deletePlaylist } = require("../utils/playlist");

router.get("/", async (req, res) => res.status(200).json({msg: "All Playlists", data: await allPlaylists()}));
router.post("/", async (req, res) => res.status(201).json({msg: "Add a Playlist", data: await addPlaylist(req.body)}));
router.delete("/", async (req, res) => res.status(200).json({msg: "Deleted All Playlists", data: await deleteAllPlaylists()}));

router.get("/:id", async (req, res) => res.status(200).json({msg: "One Playlist", data: await onePlaylist(req.params.id)}));
router.put("/:id", async (req, res) => res.status(200).json({msg: "Edit One Playlist", data: await editPlaylist(req.params.id, req.body.name)}));
router.delete("/:id", async (req, res) => res.status(200).json({msg: "Delete One Playlist", data: await deletePlaylist(req.params.id)}));


module.exports = router;