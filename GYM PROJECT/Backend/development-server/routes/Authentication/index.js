const express = require("express");
const router = express.Router();
const { Auth } = require("../../repository/Authentication");
const {
  signup,
  signin,
  dashboardHome,
  refresh_token,
  editProfile,
  forgetPassword,
  resetPassword,
  logout,
  token_verify,
} = require("../../controller/Authentication-Controller");

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/dashboard_home", Auth, dashboardHome);

router.post("/refresh_token", refresh_token);

router.put("/profile/edit_profile", Auth, editProfile);

router.post("/forget_password", forgetPassword);

router.put("/reset_password/:token", resetPassword);

router.get("/logout", logout);

router.get("/token_verify", token_verify);

module.exports = router;
