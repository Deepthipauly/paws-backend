
const {viewAllReviews, addNewBreedReview} =require("../service/review.service")

const viewAllReviewsController = async (req, res) => {
    console.log("START: viewAllReviewsController");
  
    try {
      const viewAllReviewData = await viewAllReviews(req.params);
      return res.status(201).json({
        data: viewAllReviewData,
        message: "All Reviews are displayed",
      });
    } catch (e) {
      return res.status(400).json({ error: e.message || "something went wrong" });
    }
  };

  const addNewBreedReviewController = async (req, res) => {
    console.log("START: addNewBreedReviewController");
    try {
      const addNewBreedReviewData = await addNewBreedReview(req.body,req.userId);
      return res.status(201).json({
        data: addNewBreedReviewData,
        message: "review is added",
      });
    } catch (e) {
      return res.status(400).json({ error: e.message || "something went wrong" });
    }
  };

  module.exports={viewAllReviewsController,addNewBreedReviewController}
  