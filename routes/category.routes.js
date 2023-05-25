const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/category.controller")

//viewAllCategory

router.route("/view_all_category").get(categoryController.viewCategoryController);


module.exports = router;
