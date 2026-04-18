import "../styles/features.css";
import { FaBuilding, FaMapMarkerAlt, FaUsers, FaStar } from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaBuilding />,
      title: "Modern Architecture",
      desc: "Our buildings combine innovative design with strong engineering.",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Prime Locations",
      desc: "Our projects are located in strategic and high-value areas.",
    },
    {
      icon: <FaUsers />,
      title: "Professional Team",
      desc: "Our experienced engineers and architects ensure quality work.",
    },
    {
      icon: <FaStar />,
      title: "Premium Construction",
      desc: "We use high-quality materials and modern construction techniques.",
    },
  ];

  return (
    <section className="features" data-aos="zoom-in">
      <div className="features-container">
        {/*LEFT */}
        <div className="features-left">
          <h2>Reasons to Make Shree Your Choice</h2>

          {features.map((feature, index) => (
            <div
              className="feature-card"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <div className="feature-icon">{feature.icon}</div>

              <div>
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
        {/*RIGHT */}
        <div className="features-right">
          <img
            src="https://images.unsplash.com/photo-1600585152915-d208bec867a1"
            alt="interior"
          />
        </div>
      </div>
    </section>
  );
}

export default Features;
