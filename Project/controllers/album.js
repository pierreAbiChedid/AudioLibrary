const Category = require("../models/category");
const Album = require("../models/album");
const Song = require("../models/song");

//Get a list of all the albums
exports.getAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find().sort({ createdDate: -1 });
    res.send(albums);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//Get a single Album
exports.getAlbum = async (req, res, next) => {
  const albumId = req.params.albumId;
  try {
    const album = await Album.findOne({ _id: albumId });
    res.send(album);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Add an ALbum using POST method
exports.postAddAlbum = async (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const createdDate = Date.now();
  const showData = true;
  const album = new Album({
    name: name,
    description: description,
    createdDate: createdDate,
    showData: showData,
  });
  try {
    await album.save();
    res.end();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.postEditAlbum = async (req, res, next) => {
  const updatedName = req.body.name;
  const updatedDescription = req.body.description;
  const updatedDate = Date.now();
  const albumId = req.params.albumId;
  try {
    await Album.updateOne(
      { _id: albumId },
      {
        $set: {
          name: updatedName,
          description: updatedDescription,
          updatedDate: updatedDate,
        },
      }
    );
    res.end();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete an album only if no songs are attached to it
exports.postDeleteAlbum = async (req, res, next) => {
  const albumId = req.params.albumId;

  try {
    const songs = await Song.find({ albumId: albumId });
    if (songs.length > 0) {
      return res.status(500).send("Cannot delete Album with existing songs");
    } else {
      try {
        await Album.deleteOne({ _id: albumId });
        res.end();
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAlbumList = (req, res, next) => {
  Song.aggregate([  
    {
      $lookup: {
        from: "album",
        localField: "albumId",
        foreignField: "_id",
        as: "album",
      },
    },
    { $match: { albumId: "album_id" } },
    {
      $group: {
        _id: "$album",
        numOfSongs: { $sum: 1 },
        SongList: { $push: "$name" },
      },
    },
  ])
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
