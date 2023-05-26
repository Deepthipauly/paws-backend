const {
  addBreed,
  editBreed,
  deleteBreed,
  deletedUser,
  deletedReviews,
} = require("../service/admin.service");



const addBreedAdminController = async (req, res) => {
  console.log("START: addBreedAdminController");

  try {
    const addedBreed = await addBreed(req.body);
    return res.status(201).json({
      data: addedBreed,
      message: "new Breed added",
    });
  } catch (e) {
    return res.status(400).json({ error: e.message || "something went wrong" });
  }
};

const editBreedAdminController = async (req, res) => {
  console.log("START: editBreedAdminController");

  try {
    const editedBreed = await editBreed(req.body);
    return res.status(201).json({
      data: editedBreed,
      message: "breed data updated",
    });
  } catch (e) {
    return res.status(400).json({ error: e.message || "something went wrong" });
  }
};

const deleteBreedAdminController = async (req, res) => {
  console.log("START: deleteBreedAdminController");

  try {
    const deletedBreed = await deleteBreed(req.params);
    return res.status(201).json({
      data: deletedBreed,
      message: "breed deleted",
    });
  } catch (e) {
    return res.status(400).json({ error: e.message || "something went wrong" });
  }
};

const deleteUserAdminController = async (req, res) => {
  console.log("START: deleteUserAdminController");

  try {
    const deleteUser = await deletedUser(req.params);
    return res.status(201).json({
      data: deleteUser,
      message: "user deleted",
    });
  } catch (e) {
    return res.status(400).json({ error: e.message || "something went wrong" });
  }
};

const deleteReviewAdminController = async (req, res) => {
  console.log("START: deleteReviewAdminController");

  try {
    const deleteReview = await deletedReviews(req.params);
    return res.status(201).json({
      data: deleteReview,
      message: "review deleted",
    });
  } catch (e) {
    return res.status(400).json({ error: e.message || "something went wrong" });
  }
};

module.exports = {
  addBreedAdminController,
  editBreedAdminController,
  deleteBreedAdminController,
  deleteUserAdminController,
  deleteReviewAdminController,
};
