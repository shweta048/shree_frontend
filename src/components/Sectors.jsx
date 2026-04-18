import "../styles/sectors.css";

// ✅ IMPORT IMAGES
import residentialImg from "../assets/images/residential-construction.jpg";
import commercialImg from "../assets/images/commercial-building.jpg";
import infrastructureImg from "../assets/images/infrastructure-projects.jpg";
import interiorImg from "../assets/images/interior-designing.jpg";

const sectors = [
  {
    number: "01",
    title: "Residential Construction",
    desc: "Modern apartments and luxury houses built with precision.",
    img: residentialImg,
  },
  {
    number: "02",
    title: "Commercial Buildings",
    desc: "Offices and shops designed for business growth.",
    img: commercialImg,
  },
  {
    number: "03",
    title: "Infrastructure Projects",
    desc: "Roads, bridges, and large-scale developments.",
    img: infrastructureImg,
  },
  {
    number: "04",
    title: "Interior Designing",
    desc: "Elegant interiors crafted for comfort and style.",
    img: interiorImg,
  },
];

function Sectors() {
  return (
    <section className="sectors">
      <h2 className="section-title">Our Construction Sectors</h2>

      <div className="sectors-grid">
        {sectors.map((item, index) => (
          <div
            className="sector-box"
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <img src={item.img} alt={item.title} />

            <h1 className="sector-number">{item.number}</h1>

            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Sectors;
