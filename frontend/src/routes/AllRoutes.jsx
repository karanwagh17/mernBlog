import React from "react";
import { Route, Routes } from "react-router-dom";

import SignIn from "../pages/LoginPage";
import SignUp from "../pages/Singup";
import OtpVerification from "../pages/Otpverification";
import Homepage from "../pages/HomePage";
import Dashboard from "../pages/Dashboard";
import CreatePost from "../pages/CreatePost";
import UpdatePost from "../pages/UpdatePost";
import Search from "../pages/Search";
import BlogDetail from "../pages/BlogDetail";
const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/sign-in" element={<SignIn />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route path="/otp" element={<OtpVerification />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/createpost" element={<CreatePost />}></Route>
      <Route path="/update-post/:postId" element={<UpdatePost />}></Route>
      <Route path="/blogs" element={<Search/>}></Route>
      <Route path="/singlepost/:postId" element={<BlogDetail />}></Route>
      

    </Routes>
  );
};

export default Allroutes;
