// package imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

// router imports
const authRouter = require("./routes/auth.routes");
const adminRouter = require("./routes/admin.routes");
const breedRouter = require("./routes/breed.routes");
const categoryRouter = require("./routes/category.routes");
const reviewRouter = require("./routes/review.routes");

const app = express();
app.use(express.json());
app.use(cors());

process.on("uncaughtException", (err) => {
  console.log("uncaughtException");
  console.log(err, err.message, err.stack);
  console.log("Server shutting down");
  process.exit(1);
});

//auth Route
app.use("/auth", authRouter);

//admin Route
app.use("/admin", adminRouter);

//breed Route
app.use("/breed", breedRouter);

//category Route
app.use("/category", categoryRouter);

//review Route
app.use("/review", reviewRouter);





//port setting
const server = app.listen(process.env.PORT, () => {
  console.log(`server started at port ${process.env.PORT}`);
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("db connected");
    })
    .catch((e) => {
      console.log("error in connection", e);
      process.exit(1);
    });
});

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection");
  console.log(err, err.message, err.stack);
  console.log("Server shutting down");
  process.exit(1);
});
