const express = require("express");

const router = express.Router();
const breedController = require("../controllers/breed.controller");


//viewBreed
router.route("/view_breed").get(breedController.viewBreedController);


//viewAllBreedByCategory

router.route("/view_all_breedby_category").get(breedController.viewAllBreedByCategoryController);


module.exports = router;
