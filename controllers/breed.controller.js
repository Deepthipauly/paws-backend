

const {
  viewBreed,
  viewAllBreedByCategory,
} = require("../service/breed.service");

const viewBreedController = async (req, res) => {
  console.log("START: viewBreedController");

  try {
    const viewBreedData = await viewBreed(req.params);
    return res.status(201).json({
      data: viewBreedData,
      message: "breed data is displayed",
    });
  } catch (e) {
    return res.status(400).json({ error: e.message || "something went wrong" });
  }
};

const viewAllBreedByCategoryController = async (req, res) => {
  console.log("START: viewAllBreedByCategoryController");

  try {
    const viewAllBreedData = await viewAllBreedByCategory(req.params);
    return res.status(201).json({
      data: viewAllBreedData,
      message: "All breed datas are displayed",
    });
  } catch (e) {
    return res.status(400).json({ error: e.message || "something went wrong" });
  }
};

module.exports = { viewBreedController, viewAllBreedByCategoryController };
