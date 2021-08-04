const express = require("express");

const albumController = require("../controllers/album");

const router = express.Router();


router.get("/albums", albumController.getAlbums);
router.get("/albums/:albumId", albumController.getAlbum);
router.post("/albums", albumController.postAddAlbum);
router.put("/albums/:albumId", albumController.postEditAlbum);
router.delete("/albums/:albumId", albumController.postDeleteAlbum);

router.get("/album-list", albumController.getAlbumList);

module.exports = router;
