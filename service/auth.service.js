const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
const { isUsername } = require("../helper/validator");
const { TokenModel, TOKEN_STATUS } = require("../models/token.model");
const jwt = require("jsonwebtoken");

const register = async (registerData) => {
  const { username, password } = registerData;

  if (!username) throw new Error("username is required");
  if (!isUsername(username)) throw new Error("invalid username");

  if (!password) throw new Error("password is required");

  // find user is already present in db
  //countdocuments used to findone in db

  const isUsernameExist = await UserModel.countDocuments({ username });
  if (isUsernameExist) throw new Error("username already exists");

  // hashing password
  // salt= random value
  //gensalt() --> function in bcrypt, which creates random value

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  //To create new user

  const newUser = await UserModel.create({
    username,
    password: hashedPassword,
  });
  console.log("new User created", newUser);
  return {
    username: newUser.username,
    userId: newUser._id,
  };
};

const login = async (loginData) => {
  const { username, password } = loginData;
  if (!username) throw Error("username is required");
  if (!isUsername(username)) throw Error("invalid username");

  // check is user present

  const user = await UserModel.findOne({ username });
  if (!user) throw new Error("user not registered");

  // verifying password

  if (!password) throw Error("password is required");

  const isPasswordVerified = await bcrypt.compare(password, user.password);
  if (!isPasswordVerified) throw new Error("incorrect password");

  //token generate when login

  const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_KEY);

  const storedTokenDetails = await TokenModel.findOneAndUpdate(
    // mongoose.types.objectId used to make user._id to mongoose Id

    { user: new mongoose.Types.ObjectId(user._id) }, // filter for findOneandUpdate
    {
      token,
      status: TOKEN_STATUS.ACTIVE,
      user: new mongoose.Types.ObjectId(user._id),
    },

    // upsert is given here as true value. we used upsert here to make token for the new users,
    // if they dont have token it will make a new user and create token. in case of new users in their first login.

    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log("storedTokenDetails", storedTokenDetails);
  return {
    token,
    userId: user._id,
    accountType:user.accountType,
    username: user.username,
  };
};

const logout = async (userId) => {
  const isTokenExist = await TokenModel.countDocuments({
    user: new mongoose.Types.ObjectId(userId),
    status: TOKEN_STATUS.ACTIVE,
  });

  const storedTokenDetails = await TokenModel.findOneAndUpdate(
    { user: new mongoose.Types.ObjectId(userId) },
    {
      status: TOKEN_STATUS.DELETED,
      user: new mongoose.Types.ObjectId(userId),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  if (!isTokenExist) throw new Error("Jwt Token Expired.Pls login now");

  console.log("storedTokenDetails", storedTokenDetails);
  return true;
};

module.exports = { register, login, logout };
