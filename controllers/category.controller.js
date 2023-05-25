
const {viewAllCategory} = require("../service/category.service")

const viewCategoryController = async (req, res) => {
    console.log("START: viewCategoryController");
  
    try {
      const viewCategoryData = await viewAllCategory(req.body);
      return res.status(201).json({
        data: viewCategoryData,
        message: "All Categories are displayed",
      });
    } catch (e) {
      return res.status(400).json({ error: e.message || "something went wrong" });
    }
  };
  
module.exports ={viewCategoryController};