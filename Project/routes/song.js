const express = require("express");

const songController = require("../controllers/song");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/songs", songController.getSongs);
router.get("/songs-list/:albumId", isAuth, songController.getSongsByAlbum);
router.post("/songs", songController.postAddSong);
router.put("/songs/:songId", songController.postEditSong);
router.delete("/songs/:songId", songController.postDeleteSong);

module.exports = router;
