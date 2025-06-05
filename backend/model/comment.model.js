const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
    comment: {
    type: String,
  },
    likes: {
    type: Array,
    default: [],
  },
    numberOfLikes: {
    type: Number,
    default: 0,
  },
},
{
    timestamps: true,
    versionKey: false,
});

 const commentModel = mongoose.model("comment", commentSchema);
//  moodule.exports = { commentModel };
module.exports = commentModel;