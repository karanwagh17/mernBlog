const mongoose = require("mongoose");
const postScema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
title: {
    type: String,
    required: true,
 
  },
  content: {
    type: String,
    required: true,
  },
  postImage: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2020/02/11/19/56/laptop-4840790_1280.jpg",
  },
   category:{
      type: String,
      default: "uncategorized",
    }
},{
  timestamps:true
});
const postModel = mongoose.model("postData", postScema);

module.exports = postModel;
