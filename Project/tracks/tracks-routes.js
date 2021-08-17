const express = require("express");
const { validate } = require('express-validation')
const songController = require("./tracks-controllers");
const isAuth = require("../middleware/is-auth");
const tracksValidation = require("./tracks-validation");
const router = express.Router();

router.get("/songs", songController.getSongs);
router.get("/songs-list/:albumId", isAuth, songController.getSongsByAlbum);
router.post(
  "/songs",
  songController.addSong
);
router.put("/songs/:songId", songController.editSong);
router.delete("/songs/:songId", songController.deleteSong);

module.exports = router;
