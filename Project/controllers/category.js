const Category = require("../models/category");
const Album = require("../models/album");
const Song = require("../models/song");

//Get all categories
exports.getCategories = async (req, res, next) => {
  try {
    categories = await Category.find();
    res.send(categories);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Add a Category using POST method
exports.postAddCategory = async (req, res, next) => {
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
    createdDate: Date.now(),
  });
  try {
    await category.save();
    res.end();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.postEditCategory = async (req, res, next) => {
  const updatedName = req.body.name;
  const updatedDescription = req.body.description;
  const updatedDate = Date.now();
  const categoryId = req.params.categoryId;

  try {
    await Category.updateOne(
      { _id: categoryId },
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

exports.postDeleteCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    const songs = await Song.find({ categoryId: categoryId });
    if (songs.length > 0) {
      return res.status(500).send("Cannot delete Category with existing songs");
    } else {
      try {
        await Category.deleteOne({ _id: categoryId });
        res.end();
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};