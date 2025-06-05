const express = require("express");
const userController = require("../controller/user.controller");
const isAuth = require("../middleware/isAuth");
const upload = require("../config/multer");
const checkRole = require("../middleware/CheckRole");

const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/verify", userController.verify);
userRouter.post("/signin", userController.signin);
userRouter.get("/getUserdata/:userId", isAuth, userController.getUserdata);
userRouter.patch(
  "/updateUserdata/:userId",
  isAuth,
  upload.single("profileImage"),
  userController.updateUserdata
);
userRouter.patch("/updatePassword", isAuth, userController.resetPassword);
userRouter.patch("/verifyPassword", isAuth, userController.verifyPassword);
userRouter.post("/logout", userController.logout);
userRouter.get("/getAllUser", isAuth, checkRole, userController.getAllUser);

userRouter.delete(
  "/deleteUser/:userId",
  isAuth,
  checkRole,
  userController.deleteUser
);
module.exports = userRouter;
