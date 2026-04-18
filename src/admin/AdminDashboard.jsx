import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManageContact from "./ManageContact";
import ManageNews from "./ManageNews";
import ManageProjectGallery from "./ManageProjectGallery";
import ManageSiteProject from "./ManageSiteProject";
//import ManageConstructionDetails from "./ManageConstructionDetails";
import "./AdminDashboard.css";
import api from "../services/api";

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [counts, setCounts] = useState({
    contacts: 0,
    news: 0,
    projects: 0,
    site: 5,
    construction: 6,
  });
  const navigate = useNavigate();

  const fetchCounts = async () => {
    try {
      const [contactRes, newsRes, projectRes] = await Promise.all([
        api.get("/contact"),
        api.get("/news"),
        api.get("/projects"),
      ]);

      setCounts({
        contacts: contactRes.data.length,
        news: newsRes.data.length,
        projects: projectRes.data.length,
        site: 5,
        construction: 6,
      });
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin-login", { replace: true });
      setIsLoading(false);
      return;
    }

    fetchCounts().finally(() => setIsLoading(false));
  }, [navigate]);

  if (isLoading) {
    return <div style={{ background: "#2b1d14", minHeight: "100vh" }}></div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  const renderContent = () => {
    switch (active) {
      case "contacts":
        return <ManageContact />;

      case "news":
        return <ManageNews />;

      case "projects":
        return <ManageProjectGallery />;

      case "site":
        return <ManageSiteProject />;

      case "construction":
        return <ManageConstructionDetails />;

      case "dashboard":
      default:
        return (
          <div className="dashboard">
            <div className="dashboard-header">
              <h2>Dashboard Overview</h2>
              <p>Welcome Admin</p>
            </div>

            <div className="dashboard-cards">
              <div
                className="dashboard-card"
                onClick={() => setActive("contacts")}
              >
                <h3>Contacts</h3>
                <p>{counts.contacts}</p>
              </div>

              <div className="dashboard-card" onClick={() => setActive("news")}>
                <h3>News</h3>
                <p>{counts.news}</p>
              </div>

              <div
                className="dashboard-card"
                onClick={() => setActive("projects")}
              >
                <h3>Projects</h3>
                <p>{counts.projects}</p>
              </div>

              <div className="dashboard-card" onClick={() => setActive("site")}>
                <h3> Site Details</h3>
                <p>{counts.site}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">श्री Construction</h2>

        <ul>
          <li
            onClick={() => setActive("dashboard")}
            className={active === "dashboard" ? "active" : ""}
          >
            Dashboard
          </li>

          <li
            onClick={() => setActive("contacts")}
            className={active === "contacts" ? "active" : ""}
          >
            Manage Contact
          </li>

          <li
            onClick={() => setActive("news")}
            className={active === "news" ? "active" : ""}
          >
            Manage News
          </li>

          <li
            onClick={() => setActive("projects")}
            className={active === "projects" ? "active" : ""}
          >
            Project Gallery
          </li>

          <li
            onClick={() => setActive("site")}
            className={active === "site" ? "active" : ""}
          >
            Site Details
          </li>

          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      {/* CONTENT */}
      <div className="main-content">{renderContent()}</div>
    </div>
  );
}
