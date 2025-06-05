const commentModel = require("../model/comment.model");

const commentController = {
  createComment: async (req, res) => {
    if (!req.body.comment) {
      return res.status(400).json({ message: "comment is required" });
    }
    try {
      console.log(req.body);

      const newComment = await commentModel.create({
        ...req.body,
        userId: req.user._id,
      });
      res
        .status(200)
        .json({ message: "comment created successfully", newComment });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getPostComments: async (req, res) => {
    const { postId } = req.params;
    try {
      const comments = await commentModel.find({ postId: postId });

      if (!comments) {
        return res.status(400).json({ message: "comments not found" });
      }
      return res
        .status(200)
        .json({ message: "comments fetched successfully", comments });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }
  },
  deleteComment: async (req, res) => {
    const { userId, commentId } = req.params;

    try {
      const comment = await commentModel.findByIdAndDelete(commentId);
      if (!comment) {
        return res.status(400).json({ message: "comment not found" });
      }
      return res.status(200).json({ message: "comment deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updateComment: async (req, res) => {
    const { userId, commentId } = req.params;
    if (req.user._id !== userId) {
      return res
        .status(400)
        .json({ message: "you are not authorized to update this comment" });
    }
    try {
      const updatedComment = await commentModel.findByIdAndUpdate(
        commentId,
        { $set: req.body },
        { new: true }
      );
      if (!updatedComment) {
        return res.status(400).json({ message: "comment not found" });
      }
      return res
        .status(200)
        .json({ message: "comment updated successfully", updatedComment });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getAllComments: async (req, res) => {
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "asc";
    const limit = req.query.limit || 2;
    const count = await commentModel.countDocuments();
    try {
      const comments = await commentModel
        .find()
        .limit(limit)
        .sort({ [sort]: order });
      if (!comments) {
        return res.status(400).json({ message: "comments not found" });
      }
      return res
        .status(200)
        .json({ message: "comments fetched successfully", comments ,count});
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }
  },
  likesComments: async (req, res) => {
    const comment = await commentModel.findById(req.params.commentId);
    if (!comment || comment.length === 0) {
      return res.status(400).json({ message: "comment not found" });
    }
    const index = comment.likes.indexOf(req.params.userId);

    if (index == -1) {
      comment.likes.push(req.params.userId);
      console.log(comment.likes);
      comment.numberOfLikes += 1;
      console.log(comment.numberOfLikes);
    } else {
      comment.likes.splice(index, 1);

      comment.numberOfLikes -= 1;
    }
    try {
      await comment.save();
      res.status(200).json({
        message: "Comment liked successfully",
        numberOfLikes: comment.numberOfLikes,
        likes: comment.likes,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
module.exports = commentController;
