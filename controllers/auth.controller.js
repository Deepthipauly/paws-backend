const { register, login, logout } = require("../service/auth.service");

const registerController = async (req, res) => {
  console.log("START: registerController");
  try {
    const registeredUser = await register(req.body);
    return res.status(201).json({
      data: registeredUser,
      message: "Account Registered.Please login now",
    });
  } catch (e) {
    return res.status(400).json({ error: e.message || "something went wrong" });
  }
};

const loginController = async (req, res) => {
  console.log("START : loginController");
  try {
    const loginData = await login(req.body);
    return res
      .status(200)
      .json({ data: loginData, message: "Login successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message || "something went wrong" });
  }
};

const logoutController = async (req, res) => {
  console.log("START:logoutController");
  try {
    await logout(req.userId);
    return res.status(200).json({ data: [], message: "Logout successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message || "something went wrong" });
  }
};

module.exports = { registerController, loginController, logoutController };
