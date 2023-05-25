const mongoose = require("mongoose");

const { CategoryModel } = require("../models/category.model");

const viewAllCategory = async () => CategoryModel.find({});

module.exports = { viewAllCategory };
