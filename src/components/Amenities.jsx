import "../styles/amenities.css";
import {
  FaHardHat,
  FaTools,
  FaDraftingCompass,
  FaBuilding,
  FaHammer,
  FaTruck,
} from "react-icons/fa";

function Amenities() {
  const amenities = [
    {
      icon: <FaBuilding />,
      title: "Building Construction",
    },
    {
      icon: <FaDraftingCompass />,
      title: "Architecture Planning",
    },
    {
      icon: <FaTools />,
      title: "Renovation & Repair",
    },
    {
      icon: <FaHardHat />,
      title: "Civil Engineering",
    },
    {
      icon: <FaHammer />,
      title: "Interior Design",
    },
    {
      icon: <FaTruck />,
      title: "Material Supply",
    },
  ];

  return (
    <section id="amenities" className="amenities" data-aos="fade-up">
      <h2 data-aos="face-up">Luxurious Amenities Await You</h2>

      <div className="amenities-grid">
        {amenities.map((item, index) => (
          <div
            className="amenity-card"
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <div className="amenity-icon">{item.icon}</div>

            <h4>{item.title}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Amenities;
