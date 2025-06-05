const generateOTPandToken = require("../utils/otp");
const ejs = require("ejs");
const sendMail = require("../utils/sendmail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../model/user.model");
require("dotenv").config();
const userController = {
  signup: async (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (req.body.role) {
      return res.status(400).json({ message: "you can not access" });
    }
    const isExistUser = await userModel.findOne({ email });
    if (isExistUser) {
      return res.status(400).json({ message: "account is allready created" });
    }

    const { otp, token } = generateOTPandToken({ ...req.body }, "5m");

    try {
      const htmltemplate = await ejs.renderFile(
        __dirname + "/../views/emai.ejs",
        {
          name,
          otp,
        }
      );
      await sendMail(email, htmltemplate, "otp verification");
      res.cookie("verification_token", token).status(200).json({
        message: "otp send successfully",
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  verify: async (req, res) => {
    if (!req.cookies.verification_token) {
      console.log("verification token is not get");
    }
    try {
      const decoded = jwt.verify(
        req.cookies["verification_token"],
        process.env.JWT_SECRET_KEY
      );
      if (!decoded) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
      const { otp, userData } = decoded;

      if (otp !== req.body.otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
      try {
        hashPassword = await bcrypt.hash(userData.password, 10);
        console.log("kk");
        const user = await userModel.create({
          ...userData,
          password: hashPassword,
        });
        const htmltemplate = await ejs.renderFile(
          __dirname + "/../views/conform.ejs",
          {
            name: userData.name,
          }
        );

        await sendMail(userData.email, htmltemplate, " conformationn message");

        return res.status(200).json({ message: "accoun created" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
      }
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: "Invalid or expired token" });
    }
  },
  signin: async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "fill all the blanks" });
    }
    try {
      const isExistUser = await userModel.findOne({ email: req.body.email });
      if (!isExistUser) {
        return res.status(400).json({ message: "plese create accoun first" });
      }
      const isMatch = await bcrypt.compare(req.body.password, isExistUser.password);
      if (!isMatch) {
        return res.status(400).json({ message: "invalid " });
      }
      const { password, ...rest } = isExistUser._doc;
      const { token } = generateOTPandToken({ ...rest }, "30d");
      if (!token) {
        return res.status(400).json({ message: "invalid " });
      }
      res
        .cookie("access_token", token)
        .status(200)
        .json({ message: "login successfully", rest });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  getUserdata: async (req, res) => {
    // console.log(req.user._id);
    // if (req.user._id != req.params.userId) {
    //   return res.status(400).json({ message: "you can not access this data" });
    // }
    try {
      const user = await userModel
        .findById({_id:req.user._id})
        .select("-password -__v");
      if (!user) {
        return res.status(400).json({ message: "user not found" });
      }
      return res
        .status(200)
        .json({ messsage: "userdata fetched successfully", user });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  updateUserdata: async (req, res) => {
    if (req.params.userId != req.user._id) {
      return res
        .status(400)
        .json({ message: "you are not authorized to update this user" });
    }
    try {
      let updatedUser;

      if (!req.file) {
        
        updatedUser = await userModel.findByIdAndUpdate(
          req.params.userId,
          { $set: { ...req.body } },
          { new: true }
        );
      } else {
        updatedUser = await userModel.findByIdAndUpdate(
          req.params.userId,
          { $set: { ...req.body, profileImage: req.file.originalname } },
          { new: true }
        );
      }

      if (!updatedUser) {
        return res.status(400).json({ message: "user not found" });
      }

      return res
        .status(200)
        .json({ message: "user updated successfully", updatedUser });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }
  },
  resetPassword: async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }

    try {
      const isExistUser = await userModel.findOne({ email });
      if (!isExistUser) {
        return res.status(400).json({ message: "user not found" });
      }
      const { otp, token } = generateOTPandToken({ ...isExistUser }, "15m");

      const htmltemplate = await ejs.renderFile(
        __dirname + "/../views/resetPassword.ejs",
        {
          name: isExistUser.name,
          otp,
        }
      );

      await sendMail(email, htmltemplate, "reset password otp");
      res.status(200).cookie("reset_token", token).json({
        message: "otp send successfully",
        token: token,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }
  },
  verifyPassword: async (req, res) => {
    if (!req.cookies.reset_token) {
      console.log("verification token is not get");
    }

    try {
      const decoded = jwt.verify(
        req.cookies.reset_token,
        process.env.JWT_SECRET_KEY
      );
      console.log("HELLO");

      if (!decoded) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
      const { otp } = decoded;
      const userData = decoded.userData._doc;

      if (otp !== req.body.otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
      try {
        hashPassword = await bcrypt.hash(userData.password, 10);
        const user = await userModel.findByIdAndUpdate(userData._id, {
          password: hashPassword,
        });
        if (!user) {
          return res.status(400).json({ message: "user not found" });
        }
        return res
          .status(200)
          .json({ message: "password updated successfully" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
      }
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: "Invalid or expired token" });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("access_token").status(200).json({
        message: "logout successfully",
      });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }
  },
  getAllUser: async (req, res) => {
    const limit = req.query.limit|| 2
    const count = await userModel.countDocuments();
    try {
      const users = await userModel.find({}).select("-password").limit(limit);
      if (!users) {
        return res.status(400).json({ message: "user not found" });
      }
      return res
        .status(200)
        .json({ messsage: "userdata fetched successfully", users,count });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  deleteUser: async (req, res) => {
    if (!req.params.userId) {
      return res.status(400).json({ message: "user id is required" });
    }
    try {
      const user = await userModel.findByIdAndDelete(req.params.userId);
      if (!user) {
        return res.status(400).json({ message: "user not found" });
      }
      return res
        .status(200)
        .json({ messsage: "userdata deleted successfully", user });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
module.exports = userController;
