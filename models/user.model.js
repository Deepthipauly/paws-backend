const mongoose = require("mongoose");
const { Schema } = mongoose;

const ACCOUNT_TYPE = {
  USER: "USER",
  ADMIN: "ADMIN",
};

const USER_STATUS = {
  ACTIVE: "ACTIVE",
  DELETED: "DELETED",
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      default: ACCOUNT_TYPE.USER,
      enum: Object.values(ACCOUNT_TYPE),
    },
    status: {
      type: String,
      enum: Object.values(USER_STATUS),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  UserModel: mongoose.model("user", userSchema),
  ACCOUNT_TYPE,
  USER_STATUS,
};