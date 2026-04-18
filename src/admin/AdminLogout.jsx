import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");

    setTimeout(() => {
      navigate("/admin-login");
    }, 1000);
  }, [navigate]);

  return (
    <div className="logout-page">
      <h2>Logging out...</h2>
      <p>Please wait</p>
    </div>
  );
}
