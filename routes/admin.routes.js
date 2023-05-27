const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin.controller");

const { verifyToken, verifyAdmin } = require("../middleware/token");


router.use(verifyToken,verifyAdmin);


//add category
router.route("/add_category").post(adminController.addCategoryAdminController);


// add breed
router.route("/add_breed").post(adminController.addBreedAdminController);

// edit breed

router.route("/edit_breed").patch(adminController.editBreedAdminController);

//delete breed

router.route("/delete_breed/:breedId").delete(adminController.deleteBreedAdminController);

// delete user

router.route("/delete_user/:userId").delete(adminController.deleteUserAdminController);

// delete review

router
  .route("/delete_review/:reviewId")
  .delete(adminController.deleteReviewAdminController);

module.exports = router;
