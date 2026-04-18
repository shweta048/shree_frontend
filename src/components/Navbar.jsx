import { useState } from "react";
import "./../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">श्रीconstruction</div>

      {/* Menu Links */}
      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li onClick={() => navigate("/")}>Home</li>
        <li>
          <a href="#sectors">Sectors</a>
        </li>
        <li>
          <a href="#amenities">Amenities</a>
        </li>
        <li>
          <Link to="/Project">Project Gallery</Link>
        </li>

        <li>
          <Link to="/about">About Us</Link>
        </li>
      </ul>

      {/* Reservation Button */}
      <button className="reserve-btn" onClick={() => navigate("/contact")}>
        Contact Us
      </button>

      {/* Hamburger */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default Navbar;
