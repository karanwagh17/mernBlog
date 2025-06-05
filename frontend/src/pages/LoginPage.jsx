import { Link, useNavigate } from "react-router-dom";
import "../css/Log.css";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess, signinStart } from "../redux/auth/authSlice";
import Loading from "../components/loading";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const navigate = useNavigate();

  const { error, isAuth, loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handelsubmit = async (e) => {
    e.preventDefault();
    dispatch(signinStart());
    try {

      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/user/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data.rest);
      dispatch(signInSuccess(res.data.rest));
      navigate("/")
    
    } catch (error) {
      console.log(error);
    }
  };
  if(loading){
        return <Loading type={"spokes"} color="blue" />;

  }

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
    background: "linear-gradient(to right, #1e1e2f, #121212)",
  }}    >
      <div
        className="container d-flex flex-column flex-md-row align-items-center justify-content-center bg-dark-glass p-4 rounded-4 shadow-lg"
        style={{ maxWidth: "900px" }}
      >
        {/* Left Side (Text) */}
        <div
          className="text-white text-center d-none d-md-block me-md-4"
          style={{ width: "45%" }}
        >
          <h1 className="display-5 fw-bold mb-3">Welcome Back</h1>
          <p className="lead">
            Log in to explore stories, share ideas, and connect with the
            community.
          </p>
        </div>

        {/* Right Side (Form) */}
        <div
          className="bg-glass-light rounded-4 p-4 w-100 text-white"
          style={{ maxWidth: "400px" }}
        >
          <div className="text-center mb-4">
            <h3 className="fw-bold text-info">Sign In</h3>
            <p className="text-light">Access your account securely</p>
          </div>

          <form className="d-flex flex-column gap-3">
            {/* Email */}
            <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                value={email}
                className="form-control bg-dark text-white border-0"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                className="form-control bg-dark text-white border-0"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="********"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              onClick={handelsubmit}
              className="btn btn-info w-100 fw-bold shadow"
            >
              Sign In
            </button>
          </form>

          {/* Link */}
          <div className="text-center small mt-3">
            Don’t have an account?{" "}
            <Link
              to="/sign-up"
              className="text-decoration-none text-info fw-semibold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
