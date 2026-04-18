import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/authService";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin-dashboard", { replace: true });
    } else {
      setIsChecking(false);
    }
  }, [navigate]);

  if (isChecking) {
    return <div style={{ background: "#2b1d14", minHeight: "100vh" }}></div>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await adminLogin(formData);
      localStorage.setItem("token", response.data.token);
      navigate("/admin-dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message || "Server error. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit} autoComplete="off">
        <div className="brand">
          <div className="brand-mark">श्री </div>
          <div>
            <h2>Admin Portal</h2>
            <p className="subtitle1">
              Sign in to manage content, news, projects, and users.
            </p>
          </div>
        </div>

        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="admin@example.com"
            value={formData.email || ""}
            onChange={handleChange}
            autoComplete="new-email"
            required
            spellCheck={false}
            inputMode="email"
          />
        </label>

        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password || ""}
            onChange={handleChange}
            autoComplete="new-password"
            required
            spellCheck={false}
          />
        </label>

        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
