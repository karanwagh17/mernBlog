const mongoose = require("mongoose");
const userScema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
    default: "https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png"
  },
  
},{
  timestamps:true
});
const userModel = mongoose.model("userData", userScema);

module.exports = userModel;
