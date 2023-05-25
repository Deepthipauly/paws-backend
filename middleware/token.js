const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { TokenModel, TOKEN_STATUS } = require("../models/token.model");
const { UserModel, ACCOUNT_TYPE } = require("../models/user.model");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers?.access_token;
    //verify the token with secret key
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    console.log(decoded);
    const userId = decoded.userId;
    req.userId = userId;
    const isTokenExist = await TokenModel.countDocuments({
      user: new mongoose.Types.ObjectId(userId),
      status: TOKEN_STATUS.ACTIVE,
      token,
    });
    if (!isTokenExist) throw new Error("Jwt Token Expired.Pls login now");
    const userDetails = await UserModel.findById(userId, { accountType: 1 });

    next();
  } catch (e) {
    console.log("error in verify token", e);
    return res
      .status(422)
      .json({ message: e.message || "Authentication Failed" });
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    if (!req.userId) throw new Error("User is not an admin");
    const userDetails = await UserModel.findById(req.userId, {
      accountType: 1,
    });
    if (!userDetails) throw new Error("userdetails is not available");
    req.accountType = userDetails.accountType;
    if (req.accountType !== ACCOUNT_TYPE.ADMIN)
    throw new Error("User is not an admin");
    next();
  }
   catch (e) {
    console.log("error in verify token", e);
    return res
      .status(422)
      .json({ message: e.message || "user is not an admin" });
  }
};

module.exports = { verifyToken, verifyAdmin };
