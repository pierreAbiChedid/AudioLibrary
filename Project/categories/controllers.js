const Category = require("./models");
const Song = require("../tracks/models");

//Get all categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.send({message:"success", result: categories});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Add a Category using POST method
exports.postAddCategory = async (req, res, next) => {
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
    createdDate: new Date(),
  });
  try {
    await category.save();
    res.end();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.postEditCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    await Category.updateOne(
      { _id: categoryId },
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

exports.postDeleteCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    const songs = await Song.findOne({ categoryId: categoryId });
    if (songs) {
      return res.status(409).send("Cannot delete Category with existing songs");
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