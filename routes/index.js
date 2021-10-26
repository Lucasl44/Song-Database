const router = require("express").Router();
const { allMusic, oneMusic, addMusic, editMusic, deleteMusic, deleteAllMusic } = require("../utils/index");

router.get("/", async (req, res) => res.status(200).json({msg: "All Music", data: await allMusic()}));
router.post("/", async (req, res) => res.status(201).json({msg: "Add Music", data: await addMusic(req.body)}));
router.delete("/", async (req, res) => res.status(200).json({msg: "Deleted All Music", data: await deleteAllMusic()}));

router.get("/:id", async (req, res) => res.status(200).json({msg: "One Song", data: await oneMusic(req.params.id)}));
router.put("/:id", async (req, res) => res.status(200).json({msg: "Edit One Song", data: await editMusic(req.params.id, req.body.title, req.body.artist, req.body.album)}));
router.delete("/:id", async (req, res) => res.status(200).json({msg: "Delete One Song", data: await deleteMusic(req.params.id)}));

module.exports = router;