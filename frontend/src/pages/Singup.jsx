import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpsSuccess,
  signUpStart,
  signuUperror,
} from "../redux/auth/authSlice";
import Loading from "../components/loading";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { error, isAuth, loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    dispatch(signUpStart());
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/user/signup`,
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(signUpsSuccess());
      navigate("/otp");
    } catch (error) {
      dispatch(signuUperror(error.response?.data?.message || "Signup failed"));
      console.log(error);
    }
  };

  if (loading) {
    return <Loading type={"spokes"} color="blue" />;
  }

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(to right, #1e1e2f, #121212)",
      }}
    >
      <div
        className="container d-flex flex-column flex-md-row align-items-center justify-content-center bg-dark-glass p-4 rounded-4 shadow-lg"
        style={{ maxWidth: "900px" }}
      >
        {/* Left Section - Image */}
        <div
          className="d-none d-md-block me-md-5 p-2 rounded bg-dark-glass"
          style={{ backdropFilter: "blur(8px)", borderRadius: "12px" }}
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
            alt="Sign Up Illustration"
            className="img-fluid rounded"
            style={{ maxHeight: "340px" }}
          />
        </div>

        {/* Right Section - Form */}
        <div
          className="bg-glass-light rounded-4 p-4 w-100 text-white"
          style={{ maxWidth: "400px" }}
        >
          <div className="text-center mb-4">
            <h3 className="fw-bold text-info">Create Account</h3>
            <p className="text-light">Join the community today</p>
          </div>

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {/* Name */}
            <div>
              <label className="form-label">Your Name</label>
              <input
                type="text"
                className="form-control bg-dark text-white border-0"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="form-label">Your Email</label>
              <input
                type="email"
                className="form-control bg-dark text-white border-0"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control bg-dark text-white border-0"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-info fw-bold shadow">
              Register
            </button>
          </form>

          <div className="text-center small mt-3">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-info fw-semibold text-decoration-none"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
