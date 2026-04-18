import {
  FaDraftingCompass,
  FaPencilRuler,
  FaHardHat,
  FaCheckCircle,
} from "react-icons/fa";
import "../styles/stats.css"; // or process.css (your choice)

function Stats() {
  return (
    <div className="process">
      <h2>Our Working Process</h2>

      <div className="process-container">
        <div className="process-card">
          <FaPencilRuler className="process-icon" />
          <h4>Planning & Consultation</h4>
          <p>We understand your requirements and vision.</p>
        </div>

        <div className="process-card">
          <FaDraftingCompass className="process-icon" />
          <h4>Design & Architecture</h4>
          <p>Creating modern, functional, and aesthetic designs.</p>
        </div>

        <div className="process-card">
          <FaHardHat className="process-icon" />
          <h4>Construction</h4>
          <p>High-quality materials with expert execution.</p>
        </div>

        <div className="process-card">
          <FaCheckCircle className="process-icon" />
          <h4>Final Delivery</h4>
          <p>Timely completion with quality assurance.</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
