import "../styles/contact.css";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createContact } from "../services/contactService";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    location: "",
    message: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createContact(formData);
      console.log("Success:", response);

      alert("Message sent successfully!");

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        location: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message");
    }
  };

  return (
    <div className="contact-page">
      {/*NAVBAR*/}
      <Navbar />

      {/* 🔥 HERO SECTION (IMAGE ONLY HERE) */}
      <div className="contact-hero">
        {/* LEFT SIDE */}
        <div className="left-box">
          <h1>CONTACT US</h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-box">
          <p className="subtitle">Get in touch with us!</p>

          <div className="info">
            <div className="info-items">
              <FaPhoneAlt className="icon" />
              <div>
                <p className="label">PHONE</p>
                <p>+91 9876543210</p>
              </div>
            </div>

            <div className="info-items">
              <FaMapMarkerAlt className="icon" />
              <div>
                <p className="label">ADDRESS</p>
                <p>Ujjain, India</p>
              </div>
            </div>

            <div className="info-items">
              <FaEnvelope className="icon" />
              <div>
                <p className="label">EMAIL</p>
                <p>shreeconstruction@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔽 FORM SECTION */}
      <div className="contact-form-section">
        <h2>BOOK YOUR DREAM HOME WITH श्रीCONSTRUCTION</h2>

        <form className="form-box" onSubmit={handleSubmit}>
          {/* BASIC INFO */}
          <h3>Contact Information</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
          />
          {/* BOOKING DETAILS */}
          <h3>Service Details</h3>
          <select
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
          >
            <option value="">Service Type</option>
            <option value="construction">Construction</option>
            <option value="design">Design</option>
            <option value="renovation">Renovation</option>
          </select>
          {/* LOCATION */}
          <h3>Location Info</h3>
          <input
            type="text"
            name="location"
            placeholder="Site Location"
            required
            value={formData.location}
            onChange={handleChange}
          />
          {/* ADDITIONAL */}
          <h3>Additional Info (Optional)</h3>
          <textarea
            name="message"
            placeholder="Message / Requirements"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit">SEND MESSAGE</button>
        </form>
      </div>

      {/* 🔽 FOOTER */}
      <Footer />
    </div>
  );
}

export default Contact;
