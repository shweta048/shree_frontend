import { useEffect, useState } from "react";
import "./ManageContact.css";

export default function ManageContact() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const res = await fetch(
        "https://shree-backend-lilac.vercel.app/api/contact",
      );
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.log("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Delete contact
  const deleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      await fetch(`https://shree-backend-lilac.vercel.app/api/contact/${id}`, {
        method: "DELETE",
      });
      fetchContacts();
    }
  };

  // Start editing
  const startEdit = (contact) => {
    setEditingId(contact._id);
    setEditData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      service: contact.service,
      location: contact.location,
      message: contact.message,
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  // Handle edit input change
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Save updated contact
  const saveEdit = async (id) => {
    await fetch(`https://shree-backend-lilac.vercel.app/api/contact/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    setEditingId(null);
    setEditData({});
    fetchContacts();
  };

  // Mark as handled
  const markHandled = async (id, currentStatus) => {
    const newStatus = currentStatus === "handled" ? "new" : "handled";
    // Optimistically update local state
    setContacts((prev) =>
      prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c)),
    );
    // Then update backend
    await fetch(`https://shree-backend-lilac.vercel.app/api/contact/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    // Optionally, re-fetch to ensure sync with backend
    // fetchContacts();
  };

  // Filtered contacts
  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone?.includes(searchTerm) ||
      c.service?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "new" && (!c.status || c.status === "new")) ||
      (filterStatus === "handled" && c.status === "handled");
    return matchesSearch && matchesStatus;
  });

  // Stats
  const totalContacts = contacts.length;
  const newContacts = contacts.filter(
    (c) => !c.status || c.status === "new",
  ).length;
  const handledContacts = contacts.filter((c) => c.status === "handled").length;

  return (
    <div className="manage-contact">
      <div className="header">
        <h2>📞 Contact Requests</h2>
      </div>

      {/* Stats */}
      <div className="stats-container">
        <div className="stat-card total">
          <span className="stat-icon">📊</span>
          <div className="stat-info">
            <span className="stat-number">{totalContacts}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
        <div className="stat-card new">
          <span className="stat-icon">🆕</span>
          <div className="stat-info">
            <span className="stat-number">{newContacts}</span>
            <span className="stat-label">New</span>
          </div>
        </div>
        <div className="stat-card handled">
          <span className="stat-icon">✅</span>
          <div className="stat-info">
            <span className="stat-number">{handledContacts}</span>
            <span className="stat-label">Handled</span>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="search-filter-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, email, phone, service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filterStatus === "all" ? "active" : ""}`}
            onClick={() => setFilterStatus("all")}
          >
            All
          </button>
          <button
            className={`filter-btn new ${filterStatus === "new" ? "active" : ""}`}
            onClick={() => setFilterStatus("new")}
          >
            🆕 New
          </button>
          <button
            className={`filter-btn handled ${filterStatus === "handled" ? "active" : ""}`}
            onClick={() => setFilterStatus("handled")}
          >
            ✅ Handled
          </button>
        </div>
      </div>

      {/* Action Sections */}
      <div className="action-sections">
        <div className="action-card remove">
          <span className="action-icon">🗑️</span>
          <span className="action-text">Remove Contact</span>
          <span className="action-hint">Click delete button to remove</span>
        </div>
        <div className="action-card update">
          <span className="action-icon">✏️</span>
          <span className="action-text">Update Contact</span>
          <span className="action-hint">Click edit to update</span>
        </div>
        <div className="action-card status">
          <span className="action-icon">🏷️</span>
          <span className="action-text">Mark as Handled</span>
          <span className="action-hint">Click check to mark handled</span>
        </div>
      </div>

      {/* Table */}
      {filteredContacts.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <p>No contact requests found</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="contact-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Service</th>
                <th>Location</th>
                <th>Date</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((c) => (
                <tr
                  key={c._id}
                  className={c.status === "handled" ? "handled-row" : ""}
                >
                  <td>
                    <span className={`status-badge ${c.status || "new"}`}>
                      {c.status === "handled" ? "✅ Done" : "🆕 New"}
                    </span>
                  </td>
                  {/* Editable fields */}
                  {editingId === c._id ? (
                    <>
                      <td>
                        <input
                          name="name"
                          value={editData.name}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input
                          name="phone"
                          value={editData.phone}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input
                          name="email"
                          value={editData.email}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input
                          name="service"
                          value={editData.service}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input
                          name="location"
                          value={editData.location}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      </td>
                      <td className="date-cell">
                        {c.date ? new Date(c.date).toLocaleDateString() : "—"}
                      </td>
                      <td className="message-cell">
                        <input
                          name="message"
                          value={editData.message}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{c.name}</td>
                      <td>{c.phone}</td>
                      <td>{c.email}</td>
                      <td>
                        <span className="service-tag">{c.service}</span>
                      </td>
                      <td>{c.location}</td>
                      <td className="date-cell">
                        {c.date ? new Date(c.date).toLocaleDateString() : "—"}
                      </td>
                      <td className="message-cell">{c.message}</td>
                    </>
                  )}
                  <td>
                    <div className="action-buttons">
                      {editingId === c._id ? (
                        <>
                          <button
                            className="save-btn"
                            onClick={() => saveEdit(c._id)}
                          >
                            💾 Save
                          </button>
                          <button className="cancel-btn" onClick={cancelEdit}>
                            ✖ Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="edit-btn"
                            onClick={() => startEdit(c)}
                            disabled={c.status === "handled"}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className={`mark-btn ${c.status === "handled" ? "green" : "red"}`}
                            onClick={() => markHandled(c._id, c.status)}
                          >
                            {c.status === "handled"
                              ? "✅ Handled"
                              : "❌ Handle"}
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => deleteContact(c._id)}
                          >
                            🗑️ Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
