import "./ManageProjectGallery.css";
import { useEffect, useState } from "react";
import {
  getGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} from "../services/galleryService";

export default function ManageProject() {
  const [galleryList, setGalleryList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // ✅ FIX: image should be null
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const fetchGallery = async () => {
    try {
      const res = await getGallery();
      setGalleryList(res.data.data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // ✅ TEXT INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ title: "", description: "", image: null });
    } else {
      setEditingId(null);
      setFormData({ title: "", description: "", image: null });
      setIsModalOpen(true);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await getGalleryById(id);
      const data = res.data.data; // ✅ FIX (important)

      setEditingId(id);
      setFormData({
        title: data.title || "",
        description: data.description || "",
        image: null, // keep empty for new upload
      });

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  // ✅ FIX: DO NOT create FormData here (service already does it)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateGallery(editingId, formData);
      } else {
        await createGallery(formData);
      }

      setIsModalOpen(false);
      fetchGallery();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await deleteGallery(id);
      fetchGallery();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="manage-news">
      {/* HEADER */}
      <div className="news-header">
        <h2>🏗 Project Gallery</h2>
        <button className="add-btn" onClick={handleAdd}>
          {isModalOpen ? "✕ Close Form" : "+ Add Project"}
        </button>
      </div>

      {/* INLINE FORM - Below header */}
      {isModalOpen && (
        <div className="inline-form">
          <h3>{editingId ? "✏️ Edit Project" : "➕ Add New Project"}</h3>
          <form onSubmit={handleSubmit} className="news-form">
            <div className="form-row">
              <input
                type="text"
                name="title"
                placeholder="Enter project title"
                value={formData.title}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.files[0],
                  })
                }
                required={!editingId}
                className="form-input"
              />
            </div>
            <textarea
              name="description"
              placeholder="Enter project description"
              value={formData.description}
              onChange={handleChange}
              required
              className="form-textarea"
            />
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editingId ? "💾 Update" : "➕ Add Project"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingId(null);
                }}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* PROJECT LIST - Below form */}
      <div className="news-section-title">
        <h3>📋 All Projects ({galleryList.length})</h3>
      </div>

      <div className="news-grid">
        {galleryList.length === 0 ? (
          <div className="empty-message">
            No projects added yet. Click "+ Add Project" to create one.
          </div>
        ) : (
          galleryList.map((project) => (
            <div className="news-card" key={project._id}>
              <img
                src={
                  project.image
                    ? `http://localhost:5000/uploads/${project.image}`
                    : ""
                }
                alt="project"
              />
              <div className="news-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="actions">
                  <button
                    className="edit"
                    onClick={() => handleEdit(project._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
