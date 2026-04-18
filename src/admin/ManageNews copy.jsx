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
    image: null, // ✅ store file
  });

  const [preview, setPreview] = useState(""); // ✅ for preview

  const fetchNews = async () => {
    try {
      const res = await getNews();
      setNewsList(res.data);
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
    setEditingId(null);
    setFormData({ title: "", description: "", image: null });
    setPreview("");
    setIsModalOpen(true);
  };

  const handleEdit = async (id) => {
    try {
      const res = await getNewsById(id);
      const data = res.data;

      setEditingId(id);
      setFormData({
        title: data.title || "",
        description: data.description || "",
        image: null, // ⚠️ don't set old image as file
      });

      setPreview(data.image); // ✅ show existing image
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
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
    if (!window.confirm("Delete this news?")) return;

    try {
      await deletenews(id);
      fetchNews();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="manage-news">
      <div className="news-header">
        <h2>📰 News Management</h2>
        <button className="add-btn" onClick={handleAdd}>
          + Add News
        </button>
      </div>

      {/* CARD GRID */}
      <div className="news-grid">
        {newsList.map((news) => (
          <div className="news-card" key={news._id || news.id}>
            <img
              src={news.image || "https://via.placeholder.com/400x200"}
              alt="news"
            />

            <div className="news-content">
              <h3>{news.title}</h3>
              <p>{news.description}</p>

              <span className="date">
                {news.createdAt
                  ? new Date(news.createdAt).toLocaleDateString()
                  : ""}
              </span>

              <div className="actions">
                <button
                  className="edit"
                  onClick={() => handleEdit(news._id || news.id)}
                >
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() => handleDelete(news._id || news.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>{editingId ? "Edit News" : "Add News"}</h3>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              {/* ✅ IMAGE UPLOAD FIXED */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFormData({
                      ...formData,
                      image: file, // ✅ actual file
                    });
                    setPreview(URL.createObjectURL(file)); // preview
                  }
                }}
              />

              {/* ✅ IMAGE PREVIEW */}
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  style={{ width: "50%", marginTop: "10px" }}
                />
              )}

              <textarea
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
                required
              />

              <div className="modal-actions">
                <button type="submit">{editingId ? "Update" : "Create"}</button>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="cancel"
                >
                  Exit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
