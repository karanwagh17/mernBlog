const express = require("express");
const isAuth = require("../middleware/isAuth");
const postController = require("../controller/post.controller");
const upload = require("../config/multer");
const checkRole = require("../middleware/CheckRole");

const postRouter = express.Router();

postRouter.post("/createPost", isAuth, postController.createPost);
postRouter.delete(
  "/deletePost/:userId/:postId",
  isAuth,
  postController.deletePost
);
postRouter.put(
  "/updatePost/:userId/:postId",
  isAuth,
  upload.single("postImage"),
  postController.updatePost
);
postRouter.get("/getUserPosts/:userId", isAuth, postController.getUserPosts);

postRouter.get("/getAllpost", isAuth, postController.getAllpost);

postRouter.get("/getSingelPost/:postId", isAuth, postController.getSingelPost);
module.exports = postRouter;
