import { useEffect, useState } from "react";
import "../styles/projectPage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getGallery, getGalleryById } from "../services/galleryService";

function Project() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ Fetch all projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await getGallery();

      console.log("PROJECT DATA 👉", res.data.data);

      // ✅ FIX: Always ensure array
      const data = Array.isArray(res.data) ? res.data : res.data?.data;

      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]); // safety
    }
  };

  // ✅ Fetch single project (for modal)
  const handleOpen = async (id) => {
    try {
      const res = await getGalleryById(id);
      setSelectedProject(res.data?.data || res);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <div className="project-hero">
        <div className="project-overlay">
          <h1>Project Gallery</h1>
          <div className="underline"></div>
          <p>"Showing our finest architecture work"</p>
        </div>
      </div>

      {/* PROJECTS */}
      <div className="project-page">
        <div className="carousel">
          {/* LEFT BUTTON */}
          <button
            className="arrow left"
            onClick={() =>
              setActiveIndex(
                activeIndex === 0 ? projects.length - 1 : activeIndex - 1,
              )
            }
          >
            ‹
          </button>

          {/* ✅ FIX: Safe mapping */}
          {Array.isArray(projects) &&
            projects.map((project, index) => {
              let position = "next";

              if (index === activeIndex) position = "active";
              else if (
                index === activeIndex - 1 ||
                (activeIndex === 0 && index === projects.length - 1)
              ) {
                position = "prev";
              }

              return (
                <div
                  className={`card ${position}`}
                  key={project._id || index}
                  onClick={() => {
                    if (index === activeIndex) {
                      handleOpen(project._id);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                >
                  <img
                    src={
                      project.image
                        ? `http://localhost:5000/uploads/${project.image}`
                        : ""
                    }
                    alt="project"
                  />

                  <h2>{project.title}</h2>
                </div>
              );
            })}

          {/* RIGHT BUTTON */}
          <button
            className="arrow right"
            onClick={() =>
              setActiveIndex(
                activeIndex === projects.length - 1 ? 0 : activeIndex + 1,
              )
            }
          >
            ›
          </button>
        </div>
      </div>

      {/* MODAL */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setSelectedProject(null)}
            >
              ✖
            </button>

            <h2>{selectedProject.title}</h2>

            <img
              src={
                selectedProject.image
                  ? `http://localhost:5000/uploads/${selectedProject.image}`
                  : ""
              }
              alt="project"
            />

            <p>{selectedProject.description}</p>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Project;
