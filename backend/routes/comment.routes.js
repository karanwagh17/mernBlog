const express = require("express");
const commentController = require("../controller/comment.controller");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/CheckRole");

const commentRouter = express.Router();
commentRouter.post("/addComment", isAuth, commentController.createComment);
commentRouter.get(
  "/getpostcomment/:postId",
  isAuth,
  commentController.getPostComments
);

commentRouter.delete(
  "/delete/:userId/:commentId",
  isAuth,
  commentController.deleteComment
);
commentRouter.patch(
  "/update/:userId/:commentId",
  isAuth,
  commentController.updateComment
);
commentRouter.get(
  "/admin/getallcomments",
  isAuth,
  checkRole,
  commentController.getAllComments
);
commentRouter.patch(
  "/likes/:userId/:commentId",
  isAuth,
  commentController.likesComments
);

module.exports = commentRouter;
