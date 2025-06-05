import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../redux/auth/authSlice";
import "../css/nav.css"


export default function Navbar() {
  const { error, isAuth, loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hendelLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(logout());
      navigate("/sign-in");
      localStorage.removeItem("user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <nav className="navbar navbar-expand-lg sticky-top shadow-sm">
      <div className="container pt-0">
        {/* Logo */}
        <Link to="/" className="navbar-brand fw-bold text-white fs-4">
          Homepage
        </Link>
          <Link to="/blogs" className="navbar-brand fw-bold text-white fs-4">
          Blog
        </Link>

      {
        user?.role && (
          <Link to="/createpost" className="navbar-brand fw-bold text-white fs-4">
            createpost
          </Link>)


      }

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        
        </button>

        {/* Nav Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Search */}
          <form
            className="d-flex mx-auto position-relative"
            style={{ maxWidth: "400px" }}
          >
          
           
          </form>

          {/* Right-side Actions */}
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            {/* User Avatar */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="/dashboard?tab=profile"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={
                    user?.profileImage
                      ? user.profileImage.startsWith("https")
                        ? user.profileImage
                        : `http://localhost:8080/user/${user.profileImage}`
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr_IULLOXJT80cLu-eRqkRGrHY23yLEx4p0w&s"
                  }
                  alt="user avatar"
                  className="rounded-circle border border-white"
                  width="36"
                  height="36"
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end shadow"
                aria-labelledby="userDropdown"
              >
                <li className="dropdown-header text-muted">@username</li>
                <li>
                  <Link to="/dashboard?tab=profile" className="dropdown-item">
                    Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={hendelLogout}
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </li>

            {/* Sign In */}
            <li className="nav-item">
              {isAuth ? (
                <button
                  className="btn btn-light text-primary fw-semibold px-4 rounded-pill shadow-sm"
                  onClick={hendelLogout}
                >
                  Sign out
                </button>
              ) : (
                <Link
                  to="/sign-in"
                  className="btn btn-light text-primary fw-semibold px-4 rounded-pill shadow-sm"
                >
                  Sign in
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
