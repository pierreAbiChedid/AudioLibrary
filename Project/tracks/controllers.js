const Album = require("../albums/models");
const Song = require("./models");
const TracksService = require("./services");

exports.addSong = async (req, res, next) => {
  try {
    await TracksService.addTrack(req.body);
    await TracksService.updateAlbumDate(req);
    return res.end();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.getSongs = async (req, res, next) => {
  try {
    const tracks = await TracksService.getTracks({});
    return res.json({ status: 200, message: "success", result: tracks });
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
};

exports.editSong = async (req, res, next) => {
  try {
    await TracksService.findTrack(req);
    await TracksService.editTrack(req);
    await TracksService.updateAlbumDate(req);
    res.end();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteSong = async (req, res, next) => {
  try {
    await TracksService.findTrack(req);
    await TracksService.deleteTrack(req);
    res.end();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getSongsByAlbum = async (req, res, next) => {
  try {
    const songs = await TracksService.getSongsByAlbum(req);
    res.send({ status: 200, message: "success", result: songs });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
