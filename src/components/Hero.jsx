import { Link } from "react-router-dom";
import "../styles/hero.css";
import heroImg from "../assets/images/hero-img.jpeg";
function Hero() {
  return (
    <section id="home" className="hero" data-aos="fade-up">
      {/* VIDEO BACKGROUND */}
      <img src="{hero-img} " alt="hero" className="hero-image" />
      <div className="hero-overlay" data-aos="fade-right">
        <h1>
          Shree Construction <br />
          Building Your Dream, <br />
          with Nature, and Timeless <br />
          Strength & Trust
        </h1>

        <div className="hero-buttons" data-aos="zoom-in">
          <Link to="/contact">
            <button className="btn-dark">Contact Us</button>
          </Link>
          <Link to="/project">
            <button className="btn-light">Projects Gallery</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
