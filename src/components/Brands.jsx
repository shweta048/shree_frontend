import "../styles/brands.css";
import { FaMapMarkerAlt, FaTruck, FaBuilding, FaUserTie } from "react-icons/fa";

function Brands() {
  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "150+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Skilled Experts" },
  ];

  return (
    <section className="brands">
      <h2>Building Trust Through Excellence</h2>

      <div className="brands-container">
        {stats.map((item, index) => (
          <div className="brand-item" key={index}>
            <h3>{item.number}</h3>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Brands;
