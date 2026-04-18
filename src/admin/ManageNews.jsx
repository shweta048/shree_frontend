import "./ManageNews.css";
import { useEffect, useState } from "react";
import {
  getNews,
  getNewsById,
  createnews,
  updateNews,
  deletenews,
} from "../services/newsServices";

export default function ManageNews() {
  const [newsList, setNewsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const fetchNews = async () => {
    try {
      const res = await getNews();
      setNewsList(res.data.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    if (isModalOpen) {
      // Close form
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ title: "", description: "", image: null });
    } else {
      // Open form
      setEditingId(null);
      setFormData({ title: "", description: "", image: null });
      setIsModalOpen(true);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await getNewsById(id);
      const data = res.data;
      setEditingId(id);
      setFormData({
        title: data.title || "",
        description: data.description || "",
        image: null,
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateNews(editingId, formData);
      } else {
        await createnews(formData);
      }
      setIsModalOpen(false);
      fetchNews();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await deletenews(id);
      fetchNews();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="manage-news">
      {/* HEADER */}
      <div className="news-header">
        <h2>📰 News Gallery</h2>
        <button className="add-btn" onClick={handleAdd}>
          {isModalOpen ? "✕ Close Form" : "+ Add News"}
        </button>
      </div>

      {/* INLINE FORM - Shows below header when active */}
      {isModalOpen && (
        <div className="inline-form">
          <h3>{editingId ? "✏️ Edit News" : "➕ Add New News"}</h3>
          <form onSubmit={handleSubmit} className="news-form">
            <div className="form-row">
              <input
                type="text"
                name="title"
                placeholder="Enter news title"
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
              placeholder="Enter news description"
              value={formData.description}
              onChange={handleChange}
              required
              className="form-textarea"
            />
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editingId ? "💾 Update" : "➕ Add News"}
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

      {/* NEWS LIST - Displayed below the form */}
      <div className="news-section-title">
        <h3>📋 All News ({newsList.length})</h3>
      </div>

      <div className="news-grid">
        {newsList.length === 0 ? (
          <div className="empty-message">
            No news added yet. Click "+ Add News" to create one.
          </div>
        ) : (
          newsList.map((project) => (
            <div className="news-card" key={project._id}>
              <img
                src={
                  project.image
                    ? `http://localhost:5000/uploads/${project.image}`
                    : "/no-image.png"
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
