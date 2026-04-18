import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Brands from "../components/Brands";
import Features from "../components/Features";
import Stats from "../components/Stats";
import Amenities from "../components/Amenities";
import Sectors from "../components/Sectors";
import Testimonials from "../components/Testimonials";
import News from "../components/News";
import Footer from "../components/Footer";

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <>
      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="brands">
        <Brands />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="stats">
        <Stats />
      </section>

      <section id="amenities">
        <Amenities />
      </section>

      <section id="sectors">
        <Sectors />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="news">
        <News />
      </section>

      <section id="contact">
        <Footer />
      </section>
    </>
  );
}

export default Home;
