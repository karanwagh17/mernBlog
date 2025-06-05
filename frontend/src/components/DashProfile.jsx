import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateSuccess, updateStart } from "../redux/auth/authSlice";
import { Link } from "react-router-dom";

export default function DashProfile() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: "", profileImage: null });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, profileImage: null });
    }
  }, [user]);

  const handleChange = (e) => {
    if (e.target.name === "profileImage") {
      setFormData({ ...formData, profileImage: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart());

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name || user.name);
      if (formData.profileImage) {
        formDataToSend.append("profileImage", formData.profileImage);
      }

      const res = await axios.patch(
        `${import.meta.env.VITE_BASEURL}/api/user/updateUserdata/${user?._id}`,
        formDataToSend,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(updateSuccess(res.data.updatedUser));
    } catch (error) {
      console.error(error);
    }
  };

  return (
 <div
  className="p-4 rounded shadow-sm"
  style={{
    maxWidth: "420px",
    margin: "40px auto",
    backgroundColor: "#1e1f22", // dark background
    color: "#f1f1f1", // light text
  }}
>
  <h2
    className="text-center mb-4"
    style={{ color: "#a78bfa", fontWeight: "700" }}
  >
    Your Profile
  </h2>
  <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
    <div
      className="mx-auto position-relative"
      style={{ width: 120, height: 120, cursor: "pointer" }}
      onClick={() =>
        document.querySelector('input[name="profileImage"]').click()
      }
    >
      <img
        src={
          formData.profileImage
            ? URL.createObjectURL(formData.profileImage)
            : user?.profileImage?.startsWith("https")
            ? user.profileImage
            : `http://localhost:8080/user/${user?.profileImage}`
        }
        alt="Profile"
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          objectFit: "cover",
          border: "4px solid #a78bfa",
          boxShadow: "0 0 10px rgba(167,139,250,0.5)",
        }}
      />
      <div
        className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center rounded-circle"
        style={{
          backgroundColor: "rgba(167,139,250,0.2)",
          color: "white",
          fontWeight: "600",
          opacity: 0,
          transition: "opacity 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
      >
        Change Photo
      </div>
    </div>

    <input
      type="file"
      accept="image/*"
      className="d-none"
      name="profileImage"
      onChange={handleChange}
    />
    <input
      type="text"
      className="form-control rounded-pill shadow-sm"
      placeholder="Username"
      name="name"
      value={formData.name}
      onChange={handleChange}
      style={{
        borderColor: "#a78bfa",
        backgroundColor: "#2c2d31",
        color: "#f1f1f1",
      }}
    />
    <input
      type="email"
      className="form-control rounded-pill shadow-sm"
      placeholder="Email"
      disabled
      value={user?.email}
      style={{
        backgroundColor: "#2a2b2e",
        borderColor: "#a78bfa",
        color: "#aaa",
      }}
    />

    <Button
      type="submit"
      className="rounded-pill shadow-sm"
      style={{
        backgroundColor: "#a78bfa",
        border: "none",
        color: "#1e1f22",
        fontWeight: "600",
      }}
      disabled={loading}
    >
      {loading ? <Spinner animation="border" size="sm" /> : "Update Profile"}
    </Button>

    {user?.role && (
      <Link to={"/createpost"}>
        <Button
          type="button"
          variant="dark"
          className="rounded-pill shadow-sm w-100"
          style={{
            backgroundColor: "#4b2990",
            border: "none",
            fontWeight: "600",
          }}
        >
          Create a Post
        </Button>
      </Link>
    )}
  </form>
</div>

  );
}
