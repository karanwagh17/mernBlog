import { useState } from "react";
import OtpInput from "react-otp-input";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  otpVerifyerror,
  otpVerifyStart,
  otpVerifysuccess,
} from "../redux/auth/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";

export default function OtpVerification() {
  const [otp, setOtp] = useState("");
  const { error, isAuth, loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const otpVerification = async () => {
    try {
      dispatch(otpVerifyStart());
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/user/verify`,
        {
          otp,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(otpVerifysuccess());
      navigate("/sign-in");
    } catch (error) {
      dispatch(otpVerifyerror(error?.data?.message));
      console.log(error);
    }
  };
  if (loading) {
    return <Loading type={"spokes"} color="blue" />;
  }

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #f0f8ff, #e6f7ff)",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "520px",
          borderRadius: "16px",
          backgroundColor: "#ffffffcc",
          backdropFilter: "blur(8px)",
        }}
      >
        <h3 className="text-center fw-bold text-primary mb-4">
          🔐 Verify Your OTP
        </h3>

        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className="mx-2 text-muted">-</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: "60px",
            height: "60px",
            fontSize: "24px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            backgroundColor: "#f4faff",
            color: "#333",
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
          focusStyle={{
            border: "2px solid #0d6efd",
            outline: "none",
            backgroundColor: "#fff",
          }}
        />

        <button
          className="btn btn-primary mt-4 w-100"
          onClick={otpVerification}
          disabled={otp.length < 6}
          style={{
            fontSize: "17px",
            padding: "12px",
            borderRadius: "10px",
            background: "linear-gradient(45deg, #0d6efd, #0dcaf0)",
            border: "none",
          }}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
