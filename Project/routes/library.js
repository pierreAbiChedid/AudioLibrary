const path = require("path");

const express = require("express");

const libraryController = require("../controllers/library");

const router = express.Router();


router.get("/categories", libraryController.getCategories);
router.post("/add-category", libraryController.postAddCategory);
router.patch("/edit-category/:categoryId", libraryController.postEditCategory);
router.delete("/delete-category/:categoryId", libraryController.postDeleteCategory);


router.get("/albums", libraryController.getAlbums);
router.post("/add-album", libraryController.postAddAlbum);
router.patch("/edit-album/:albumId", libraryController.postEditAlbum);
router.delete("/delete-album/:albumId", libraryController.postDeleteAlbum);


router.get("/songs", libraryController.getSongs);
router.post("/add-song", libraryController.postAddSong);
router.patch("/edit-song/:songId", libraryController.postEditSong);
router.delete("/delete-song/:songId", libraryController.postDeleteSong);


// Route for the ordered album by createdDate
router.get("/album-list", libraryController.getAlbumList);


module.exports = router;
