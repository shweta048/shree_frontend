import "../styles/footer.css";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section">
          <h2>श्रीConstruction</h2>
          <p>
            Experience luxury living with modern architecture, premium
            materials, and thoughtfully designed spaces built for comfort and
            elegance.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>Sectors</li>
            <li>Amenities</li>
            <li>Gallery</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact</h3>

          <p>Email: swetarajput484@gmail.com</p>
          <p>Phone: +91 8103 972 504</p>
          <p>Location: Ujjain, M.P. India</p>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3>Follow Us</h3>

          <div className="social-icons">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>
      </div>

      <div className="footer-bottom">© 2026 BIPS. All Rights Reserved.</div>
    </footer>
  );
}

export default Footer;
