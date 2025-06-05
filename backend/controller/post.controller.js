const postModel = require("../model/post.model");

const postController = {
  createPost: async (req, res) => {
    if (!req.body.title || !req.body.content) {
      return res
        .status(400)
        .json({ message: "title,description and image are required" });
    }

    try {
      const post = await postModel.create({
        ...req.body,
        userId: req.user._id,
      });
      return res
        .status(200)
        .json({ message: "post created successfully", post });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  deletePost: async (req, res) => {
    const { postId, userId } = req.params;
    // if (userId == req.user._id) {
    //   return res
    //     .status(400)
    //     .json({ message: "you are not authorized to delete this post" });
    // }
    try {
      const post = await postModel.findByIdAndDelete(postId);
      if (!post) {
        return res.status(400).json({ message: "post not found" });
      }
      return res
        .status(200)
        .json({ message: "post deleted successfully", post });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  updatePost: async (req, res) => {
    const { postId, userId } = req.params;

    // Authorization check
    if (userId != req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this post" });
    }

    try {
      const updateData = {
        ...req.body,
      };

      // If there's a new image file, include it
      if (req.file) {
        updateData.postImage = req.file.originalname;
      }

      const post = await postModel.findByIdAndUpdate(
        postId,
        { $set: updateData },
        { new: true }
      );

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      return res
        .status(200)
        .json({ message: "Post updated successfully", post });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  },

  getSingelPost: async (req, res) => {
    const { postId } = req.params;
    console.log(req.params);
    if (!postId) {
      return res.status(400).json({ message: "post id is required" });
    }
    try {
      const post = await postModel.findOne({ _id: postId });
     
      if (!post) {
        return res.status(400).json({ message: "post not found" });
      }
      return res
        .status(200)
        .json({ message: "post fetched successfully", post });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  getAllpost: async (req, res) => {
    const limit = parseInt(req.query.limit) || 2;
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "asc";
    const startIndex = parseInt(req.query.startIndex) || 0;
    const search = req.query.search || "";
    const category = req.query.category;

    try {
      const query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
        ],
      };

      if (category && category !== "all") {
        query.category = category;
      }

      const totalDocument = await postModel.countDocuments(query);

      const post = await postModel
        .find(query)
        .limit(limit)
        .sort({ [sort]: order === "asc" ? 1 : -1 })
        .skip(startIndex);

      if (!post) {
        return res.status(400).json({ message: "Post not found" });
      }

      return res.status(200).json({
        message: "Post fetched successfully",
        post,
        totalDocument,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getUserPosts: async (req, res) => {
    const limit = req.query.limit || 2;
    // console.l
    // if (req.body.userId != req.user._id) {
    //   return res.status(400).json({ message: "you are not access this post" });
    // }
    try {
      const post = await postModel.find(req.body.userId).limit(limit);
      if (!post) {
        return res.status(400).json({ message: "post is not found" });
      }
      return res
        .status(200)
        .json({ message: "post fetched successfully", post });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
module.exports = postController;
