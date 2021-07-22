const Album = require("../models/album");
const Category = require("../models/category");
const Song = require("../models/song");

exports.getCategories = (req, res, next) => {
  Category.find()
    .then((categories) => {
      console.log(categories);
      res.json(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Add a Category using POST method
exports.postAddCategory = (req, res, next) => {
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
  });
  category
    .save()
    .then((result) => {
      console.log("Created Category");
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.postEditCategory = (req, res, next) => {
  const updatedName = req.body.name;
  const updatedDescription = req.body.description;
  const updatedDate = Date.now();
  const categoryId = req.params.categoryId;

  Category.updateOne(
    { _id: categoryId },
    {
      $set: {
        name: updatedName,
        description: updatedDescription,
        updatedDate: updatedDate,
      },
    }
  )
    .then((result) => {
      console.log("UPDATED CATEGORY!");
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.postDeleteCategory = (req, res, next) => {
  const categoryId = req.params.categoryId;
  Category.deleteOne({ _id: categoryId })
    .then((result) => {
      console.log("DESTROYED CATEGORY");
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.getAlbums = (req, res, next) => {
  Album.find()
    .sort({ createdDate: "descending" })
    .then((albums) => {
      res.send(albums);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Add an ALbum using POST method
exports.postAddAlbum = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const album = new Album({
    name: name,
    description: description,
  });
  album
    .save()
    .then((result) => {
      console.log("Created Album");
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditAlbum = (req, res, next) => {
  const updatedName = req.body.name;
  const updatedDescription = req.body.description;
  const updatedDate = Date.now();
  const albumId = req.params.albumId;

  Album.updateOne(
    { _id: albumId },
    {
      $set: {
        name: updatedName,
        description: updatedDescription,
        updatedDate: updatedDate,
      },
    }
  )
    .then((result) => {
      console.log("UPDATED ALBUM!");
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.postDeleteAlbum = (req, res, next) => {
  const albumId = req.params.albumId;
  Album.deleteOne({ _id: albumId })
    .then((result) => {
      console.log("DESTROYED ALBUM");
      res.json(result);
    })
    .catch((err) => console.log(err));
};

// Add a Song using POST method
exports.postAddSong = (req, res, next) => {
  const name = req.body.name;
  const singer = req.body.singer;
  const albumId = req.body.albumId;
  const categoryId = req.body.categoryId;
  const song = new Song({
    name: name,
    singer: singer,
    albumId: albumId,
    categoryId: categoryId,
    
  });
  song
    .save()
    .then((result) => {
      console.log("Created Song");
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });

  // Increases the number of tracks of that specific album
  Album.findById(albumId)
    .then((album) => {
      if (!album.showNbTracks) {
        album.showNbTracks = 1;
      } else {
        album.showNbTracks = album.showNbTracks + 1;
      }
      return album.save();
    })
    .then((result) => {
      console.log("UPDATED ALBUM TRACKS!");
    })
    .catch((err) => console.log(err));
};

exports.getSongs = (req, res, next) => {
  Song.find()
    .then((songs) => {
      res.json(songs);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditSong = (req, res, next) => {
  const updatedName = req.body.name;
  const updatedSinger = req.body.singer;
  const updatedAlbumId = req.body.albumId;
  const updatedCategoryId = req.body.categoryId;
  const songId = req.params.songId;

  Song.updateOne(
    { _id: songId },
    {
      $set: {
        name: updatedName,
        singer: updatedSinger,
        albumId: updatedAlbumId,
        categoryId: updatedCategoryId,
      },
    }
  )
    .then((result) => {
      console.log("UPDATED SONG!");
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.postDeleteSong = (req, res, next) => {
  const songId = req.params.songId;

  Song.findById(songId)
    .then((song) => {
      const albumId = song.albumId;

      Album.findById(albumId)
        .then((album) => {
          if (album.showNbTracks <= 0) {
            album.showNbTracks = 0;
          } else {
            album.showNbTracks = album.showNbTracks - 1;
          }
          return album.save();
        })
        .then((result) => {
          console.log("UPDATED ALBUM TRACKS!");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));

  Song.findOneAndDelete({ _id: songId })
    .then((result) => {
      console.log("DESTROYED Song");
      res.json(result);
    })
    .catch((err) => console.log(err));
};

// Get a list of Albums sorted by their creation date
// Number of tracks is automatically incremented when a new Song is added
exports.getAlbumList = (req, res, next) => {
  Album.find({})
    .sort({ createdDate: -1 })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
