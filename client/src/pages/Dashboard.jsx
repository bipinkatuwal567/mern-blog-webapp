import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPost from "../components/DashPost";

const Dashboard = () => {
  const location = useLocation();

  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <section className="min-h-screen flex flex-col md:flex-row">
      {/* Dashboard Sidebar */}
      <div className="md:w-56">
        <DashSidebar />
      </div>

      {/* Dashbaord main section */}
      {tab === "profile" && <DashProfile />}
      {tab === "post" && <DashPost />}
    </section>
  );
};

export default Dashboard;
