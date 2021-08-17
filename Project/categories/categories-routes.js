const express = require("express");

const categoryController = require("./categories-controllers");

const router = express.Router();

router.get("/categories", categoryController.getCategories);
router.post("/categories", categoryController.postAddCategory);
router.put("/categories/:categoryId", categoryController.postEditCategory);
router.delete("/categories/:categoryId", categoryController.postDeleteCategory);


module.exports = router;
