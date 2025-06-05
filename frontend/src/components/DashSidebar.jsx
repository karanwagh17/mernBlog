import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { useSelector } from "react-redux";

export default function DashSidebar() {
  const { user } = useSelector((state) => state.auth);
  const [isAdmin] = useState(user.role);
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <div
      className="d-flex flex-column p-3 shadow"
      style={{
        // position: "fixed",
        top: 0,
        left: 0,
        width: "250px",
        height: "100vh",
        backgroundColor: "#121417", // dark background
        color: "#ffffff",
      }}
    >
      <h4 className="mb-4 text-center fw-bold text-info">Dashboard</h4>
      <Nav className="flex-column gap-3">
        {isAdmin && (
          <Link
            to="/dashboard?tab=dash"
            className="nav-link d-flex align-items-center gap-2 rounded px-3 py-2"
            style={{
              backgroundColor: "#1f2937",
              color: "#fff",
            }}
          >
            <HiChartPie size={20} /> Dashboard
          </Link>
        )}
        <Link
          to="/dashboard?tab=profile"
          className="nav-link d-flex align-items-center gap-2 rounded px-3 py-2"
          style={{
            backgroundColor: "#1f2937",
            color: "#fff",
          }}
        >
          <HiUser size={20} /> Profile{" "}
          <span
            className="badge ms-auto"
            style={{
              
              backgroundColor: "#374151",
              color: "#9ca3af",
              fontWeight: "600",
            }}
          >
            {isAdmin ? "Admin" : "User"}
          </span>
        </Link>
        {isAdmin && (
          <>
            <Link
              to="/dashboard?tab=posts"
              className="nav-link d-flex align-items-center gap-2 rounded px-3 py-2"
              style={{
                backgroundColor: "#1f2937",
                color: "#fff",
              }}
            >
              <HiDocumentText size={20} /> Posts
            </Link>
            <Link
              to="/dashboard?tab=users"
              className="nav-link d-flex align-items-center gap-2 rounded px-3 py-2"
              style={{
                backgroundColor: "#1f2937",
                color: "#fff",
              }}
            >
              <HiOutlineUserGroup size={20} /> Users
            </Link>
            <Link
              to="/dashboard?tab=comments"
              className="nav-link d-flex align-items-center gap-2 rounded px-3 py-2"
              style={{
                backgroundColor: "#1f2937",
                color: "#fff",
              }}
            >
              <HiAnnotation size={20} /> Comments
            </Link>
          </>
        )}
        <div
          className="nav-link d-flex align-items-center gap-2 rounded px-3 py-2 mt-auto"
          style={{
            backgroundColor: "#4b5563",
            color: "#f9fafb",
            cursor: "pointer",
          }}
          onClick={handleSignOut}
        >
          <HiArrowSmRight size={20} /> Sign Out
        </div>
      </Nav>
    </div>
  );
}
