import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type, color }) => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <ReactLoading type={type} color={color} height={"20%"} width={"20%"} />
  </div>
);

export default Loading;
