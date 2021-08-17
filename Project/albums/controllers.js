const Album = require("./models");
const Song = require("../tracks/models");

//Get a list of all the albums
exports.getAlbums = async (req, res, next) => {
  try {
    const result = await Album.find().sort({ createdDate: -1 });
    res.send({ message: "success", result: result });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//Get a single Album
exports.getAlbum = async (req, res, next) => {
  const albumId = req.params.albumId;
  try {
    const result = await Album.findOne({ _id: albumId });
    res.send({ message: "success", result: result });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Add an ALbum using POST method
exports.postAddAlbum = async (req, res, next) => {
  const album = new Album({
    name: req.body.name,
    description: req.body.description,
    createdDate: new Date(),
  });
  try {
    await album.save();
    res.end();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.postEditAlbum = async (req, res, next) => {
  const albumId = req.params.albumId;
  try {
    await Album.updateOne(
      { _id: albumId },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          updatedDate: new Date(),
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

exports.getAlbumList = async (req, res, next) => {
  try {
    const result = await Song.aggregate([
      {
        $group: {
          _id: "$albumId",
          numOfTracks: { $sum: 1 },
        },
      },
    ]);
    res.send({ message: "success", result: result });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
