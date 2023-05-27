const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { TokenModel, TOKEN_STATUS } = require("../models/token.model");
const { UserModel, ACCOUNT_TYPE,USER_STATUS } = require("../models/user.model");

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
    const userDetails = await UserModel.findById(userId, { accountType: 1,status : 1 });
    if(userDetails.status !== USER_STATUS.ACTIVE) throw new Error("User not find!!");
    req.accountType = userDetails.accountType;
    next();
  } catch (e) {
    console.log("error in verify token", e);
    return res
      .status(422)
      .json({ message: e.message || "Authentication Failed" });
  }
};

const verifyAdmin = (req, res, next) => {
  try { 
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
