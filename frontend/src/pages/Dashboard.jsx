import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashboardComp from "../components/DashboardComp";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import "../css/dash.css";
import DashComments from "../components/DashComments";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("profile");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setTab(params.get("tab") || "profile");
  }, [location.search]);

  return (
    <div
      className="d-flex "
      style={{ minHeight: "100vh", backgroundColor:"#121417", color: "#2c2c2c" }}

    >
      <DashSidebar />
      <div
        className="flex-grow-1  mainSidebar"
        style={{  
         
          borderRadius: "0 12px 12px 0",
          boxShadow: "0 4px 12px rgba(106,17,203,0.1)",
        }}
      >
        {tab === "profile" && <DashProfile />}
        {tab === "posts" && <DashPosts/>}
        {tab === "users" && <DashUsers/>}
        {tab === "comments" && <DashComments/>}
        {tab === "dash" && <DashboardComp/>}
      </div>
    </div>
  );
}
