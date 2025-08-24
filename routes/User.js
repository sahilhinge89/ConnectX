const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  sendOTP,
  changePassword,
} = require("../controllers/Auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

const {
  updateProfile,
  deleteAccount,
  getAllUserDetails
} = require("../controllers/Profile");

const { auth } = require("../middlewares/auth");

// =======================================
// Auth Routes
// =======================================
router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendOTP);
router.post("/changepassword", auth, changePassword);

// =======================================
// Reset Password
// =======================================
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

// =======================================
// Profile Routes
// =======================================
router.put("/update-profile", auth, updateProfile);
router.delete("/delete-account", auth, deleteAccount);
router.get("/user-details", auth, getAllUserDetails);

module.exports = router;
