const Song = require("./tracks-models");
const Album = require("../albums/albums-models");
const io = require("../socket");
const mongoose = require("mongoose");


exports.getTracks = async (body) => {
  try {
    const songs = await Song.find();
    return songs;
  } catch (err) {
    throw new Error("Error while finding tracks");
  }
};

exports.addTrack = async (body) => {
  const song = new Song({
    name: body.name,
    singer: body.singer,
    albumId: body.albumId,
    categoryId: body.categoryId,
  });
  try {
    await song.save();
    io.getIO().emit("tracks", { action: "create", post: song });
  } catch {
    throw new Error("Error while adding a track");
  }
};

exports.updateAlbumDate = async (req) => {
  albumId = req.body.albumId;
  try {
    await Album.updateOne(
      { _id: albumId },
      { $set: { updatedDate: new Date() } }
    );
  } catch (err) {
    throw new Error("Error while updating album date");
  }
};

exports.findTrack = async (req) => {
  const songId = req.params.songId;
  try {
    const song = await Song.findOne({ _id: songId });
    if (!song) {
      throw new Error("No track found with this id");
    }
  } catch (err) {
    throw err;
  }
};

exports.editTrack = async (req) => {
  const songId = req.params.songId;
  try {
    const song = await Song.updateOne(
      { _id: songId },
      {
        $set: {
          name: req.body.name,
          singer: req.body.singer,
          albumId: req.body.albumId,
          categoryId: req.body.categoryId,
        },
      }
    );
    io.getIO().emit("tracks", { action: "update", post: song });
  } catch (err) {
    throw new Error("Track could not be edited.");
  }
};

exports.deleteTrack = async (req) => {
  const songId = req.params.songId;
  try {
    await Song.deleteOne({ _id: songId });
    io.getIO().emit("tracks", { action: "delete", post: songId });
  } catch (err) {
    throw new Error("Track could not be deleted.");
  }
};

exports.getSongsByAlbum = async (req) => {
  try {
    const albumId = mongoose.Types.ObjectId(req.params.albumId);
    let categoryId = req.query.categoryId;
    const searchValue = req.query.searchValue;
    const pageNumber = req.query.pageNumber;
    let re = new RegExp(searchValue, "gi");

  // We have 2 cases, either the categoryId is already given, which means there's no need
  // to search by category name, or the categoryId is not given, which means that a search is being made.
    if (categoryId == null) {
      const songs = await Song.aggregate([
        { $match: { albumId: albumId } },
        { $sort: { createdDate: -1 } },
        { $skip: pageNumber * 5 },
        { $limit: 5 },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "categoryDetails",
          },
        },
        { $project: { name: 1, singer: 1, albumId: 1, categoryName: "$categoryDetails.name" } },
        { $match: { "categoryName": { $regex: re } } },  
        
      ]);
      return songs;
      //Second case
    } else {
      categoryId = mongoose.Types.ObjectId(req.query.categoryId);
      const songs = await Song.aggregate([
        { $match: { albumId: albumId, categoryId: categoryId } },
        { $sort: { createdDate: -1 } },
        { $skip: pageNumber * 5 },
        { $limit: 5 },
      ]);
      return songs;
    }
  } catch (err) {
    throw err;
  }
};
