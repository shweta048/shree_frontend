import { useNavigate } from "react-router-dom";
import "../styles/about.css";

function About() {
  const navigate = useNavigate();
  return (
    <section id="about" className="about" data-aos="fade-up">
      <div className="about-container">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
            alt="interior"
          />
        </div>

        <div className="about-text">
          <h1>ABOUT US</h1>

          <h3 className="main-heading">
            “Where Vision Meets Concrete, <br />
            <span>and Dreams Become Reality”</span>
          </h3>

          <p>
            Shree Construction is a trusted construction company specializing in
            residential and commercial buildings. We deliver quality structures
            with modern designs, strong foundations, and reliable project
            management.
          </p>

          <button className="about-btn" onClick={() => navigate("/about")}>
            Read More
          </button>
        </div>
      </div>
    </section>
  );
}

export default About;
