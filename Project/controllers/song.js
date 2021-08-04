const Category = require("../models/category");
const Album = require("../models/album");
const Song = require("../models/song");

exports.postAddSong = async (req, res, next) => {
  const song = new Song({
    name: req.body.name,
    singer: req.body.singer,
    albumId: req.body.albumId,
    categoryId: req.body.categoryId,
  });

  try {
    await song.save();
    res.end();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }

  try {
    await Album.updateOne(
      { _id: albumId },
      { $set: { updatedDate: Date.now() } }
    );
    res.end();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getSongs = async (req, res, next) => {
  try {
    const songs = await Song.find();
    res.send(songs);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.postEditSong = async (req, res, next) => {
  const updatedName = req.body.name;
  const updatedSinger = req.body.singer;
  const updatedAlbumId = req.body.albumId;
  const updatedCategoryId = req.body.categoryId;
  const songId = req.params.songId;

  try {
    const song = await Song.findOne({ _id: songId });
    if (!song) {
      return res.status(500).send("Record not available");
    } else
      try {
        await Song.updateOne(
          { _id: songId },
          {
            $set: {
              name: updatedName,
              singer: updatedSinger,
              albumId: updatedAlbumId,
              categoryId: updatedCategoryId,
            },
          }
        );
        res.end();
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.postDeleteSong = async (req, res, next) => {
  const songId = req.params.songId;

  try {
    song = await Song.findOne({ _id: songId });
    if (!song) {
      return res.status(500).send("Record not available");
    } else
      try {
        await Song.deleteOne({ _id: songId });
        res.end();
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getSongsByAlbum = async (req, res, next) => {
  const albumId = req.params.albumId;
  const categoryId = req.query.categoryId;

  // try {
  //   const songs = await Song.aggregate([
  //     { $match: { albumId: albumId } },
  //     { $group: { _id: "$name"} },
  //   ]);
  //   return res.send(songs);
  // } catch (err) {
  //   res.status(500).send({ message: err.message });
  // }

  Song.find({ albumId: albumId, categoryId: categoryId })
    .sort({ createdDate: -1 })
    .then((songs) => {
      res.send(songs);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
