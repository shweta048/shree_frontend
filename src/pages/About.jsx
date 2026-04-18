import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/aboutPage.css";
import aboutMain from "../assets/images/about-us.png";

function About() {
  return (
    <>
      <Navbar />
      <div className="about-top-section">
        <img src="/about-mainweb.webp" alt="about" />
        <div className="about-overlay">
          <h1>ABOUT US</h1>
          <p className="about-slogan">
            "More then Construction, We build Relationship"
          </p>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <section className="about-content">
        <p className="about-desc">
          Shree Construction was created with a clear purpose: to deliver
          strong, modern, and reliable construction solutions that make every
          project seamless and memorable.
        </p>

        <div className="about-grid">
          <div>
            <h3>What we do?</h3>
            <p>
              We create strong, functional, and visually appealing spaces. At
              Shree Construction, we turn ideas into reality by providing
              end-to-end construction services, including design, construction,
              renovation, and interior finishing. Our focus is on quality,
              innovation, and delivering projects that exceed expectations. "We
              provide premium construction services with a personal touch".
            </p>
          </div>

          <div>
            <h3>Our Services</h3>
            <p>
              At Shree Construction, we combine expertise, innovation, and
              precision to deliver exceptional construction solutions. Whether
              it’s building modern homes, commercial spaces, or transforming
              interiors, we are committed to quality, reliability, and attention
              to detail. Our goal is to create structures that stand strong
              while reflecting elegance and functionality. "Residential,
              commercial, and interior projects crafted with precision and
              modern techniques".
            </p>
          </div>

          <div>
            <h3>Accessibility</h3>
            <p>
              Shree Construction is committed to making our website accessible
              to all users by ensuring easy navigation, readable content, and a
              responsive design. "We ensure every project is efficient,
              accessible, and built with long-term quality in mind".
            </p>
          </div>

          <div>
            <h3>Our Team</h3>
            <p>
              Our team at Shree Construction is a blend of expertise, passion,
              and professionalism. With years of experience in the construction
              industry, we work collaboratively to bring innovative ideas to
              life. Every project is handled with care, ensuring high standards
              of quality, durability, and client satisfaction. "Our experienced
              team delivers excellence with strong planning and execution".
            </p>
          </div>
        </div>
        <div className="about-right">
          <img src={aboutMain} alt="about" />
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;
