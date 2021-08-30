const express = require("express");
const { validate } = require("express-validation");
const songController = require("./tracks-controllers");
const isAuth = require("../middleware/is-auth");
const tracksValidation = require("./tracks-validation");
const router = express.Router();

router.get("/songs", songController.getSongs);
router.get("/songs-list/:albumId", validate(tracksValidation.getTrackValidator, {}, {}), songController.getSongsByAlbum);
router.post("/songs", validate(tracksValidation.addTrackValidator, {}, {}),songController.addSong);
router.put("/songs/:songId", validate(tracksValidation.editTrackValidator, {}, {}), songController.editSong);
router.delete("/songs/:songId", validate(tracksValidation.deleteTrackValidator, {}, {}) ,songController.deleteSong);

module.exports = router;
