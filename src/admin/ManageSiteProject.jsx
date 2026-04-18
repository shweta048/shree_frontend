import "./ManageSiteProject.css";
import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
} from "../services/siteProjectService";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function ManageSiteProject() {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    phone: "",
    email: "",
    address: "",
    siteName: "",
    startDate: "",
    endDate: "",
    foundation: "",
    framing: "",
    electrics: "",
    plumbing: "",
    totalAmount: "",
    paidAmount: "",
    managerName: "",
    managerEmail: "",
    managerPhone: "",
    status: "working",
  });

  const dueAmount =
    formData.totalAmount && formData.paidAmount
      ? formData.totalAmount - formData.paidAmount
      : 0;

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const data = await getProjects();
    setClients(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClient = async (e) => {
    e.preventDefault();

    // Debug: Log formData to see what's being sent
    console.log("Form Data before submit:", formData);
    console.log(
      "Foundation value:",
      formData.foundation,
      "type:",
      typeof formData.foundation,
    );

    const clientData = {
      ...formData,
      foundation:
        formData.foundation === "" ? 0 : Number(formData.foundation) || 0,
      framing: formData.framing === "" ? 0 : Number(formData.framing) || 0,
      electrics:
        formData.electrics === "" ? 0 : Number(formData.electrics) || 0,
      plumbing: formData.plumbing === "" ? 0 : Number(formData.plumbing) || 0,
      totalAmount:
        formData.totalAmount === "" ? 0 : Number(formData.totalAmount) || 0,
      paidAmount:
        formData.paidAmount === "" ? 0 : Number(formData.paidAmount) || 0,
      dueAmount:
        Number(formData.totalAmount || 0) - Number(formData.paidAmount || 0),
    };

    console.log("Client Data to send:", clientData);

    if (editId) {
      // Update existing client - use returned data from API
      const updatedData = await updateProject(editId, clientData);
      console.log("Updated data from API:", updatedData);
      // Update selectedClient if it's the same client being edited
      if (selectedClient && selectedClient._id === editId) {
        setSelectedClient(updatedData);
      }
    } else {
      // Create new client
      await createProject(clientData);
    }

    fetchClients();
    setShowModal(false);
    setEditId(null);
    setFormData({
      name: "",
      contact: "",
      phone: "",
      email: "",
      address: "",
      siteName: "",
      startDate: "",
      endDate: "",
      foundation: "",
      framing: "",
      electrics: "",
      plumbing: "",
      totalAmount: "",
      paidAmount: "",
      managerName: "",
      managerEmail: "",
      managerPhone: "",
      status: "working",
    });
  };

  const handleDelete = async (id) => {
    await deleteProject(id);
    fetchClients();
  };

  // Filtering logic
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.siteName?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "all" ? true : client.status === status;
    return matchesSearch && matchesStatus;
  });

  // Status circle toggle
  const handleStatusToggle = async (client) => {
    const newStatus = client.status === "completed" ? "working" : "completed";
    const updatedData = { ...client, status: newStatus };
    await updateProject(client._id, updatedData);
    fetchClients();
  };

  const getStatusCircle = (client) => (
    <span
      className={`status-circle${client.status === "completed" ? " completed" : " working"}`}
      title={client.status === "completed" ? "Completed" : "Working"}
      onClick={() => handleStatusToggle(client)}
      style={{ cursor: "pointer", display: "inline-block", margin: "0 auto" }}
    />
  );

  return (
    <div className="site-container">
      <h1>Manage Site Projects</h1>

      {/* Top Bar: Search + Add Button */}
      <div className="top-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search by client or site..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Client
        </button>
      </div>

      {/* Status Tabs */}
      <div className="status-tabs">
        <button
          className={status === "all" ? "active" : ""}
          onClick={() => setStatus("all")}
        >
          All
        </button>
        <button
          className={status === "working" ? "active" : ""}
          onClick={() => setStatus("working")}
        >
          Working
        </button>
        <button
          className={status === "completed" ? "active" : ""}
          onClick={() => setStatus("completed")}
        >
          Completed
        </button>
      </div>

      {/* Table */}
      {!selectedClient && (
        <div className="table">
          <div className="table-header">
            <span>Client Name</span>
            <span>Site Name</span>
            <span>Status</span>
            <span>Action</span>
          </div>
          {filteredClients.length === 0 && (
            <div className="table-row empty">No projects found.</div>
          )}
          {filteredClients.map((client) => (
            <div className="table-row" key={client._id}>
              <span>{client.name}</span>
              <span>{client.siteName}</span>
              <span>{getStatusCircle(client)}</span>
              <span className="actions">
                <button
                  className="view-btn"
                  onClick={() => setSelectedClient(client)}
                >
                  View
                </button>
                <button
                  className="edit-btn"
                  onClick={() => {
                    console.log("Editing client:", client);
                    setEditId(client._id);
                    setFormData({
                      name: client.name || "",
                      contact: client.contact || "",
                      phone: client.phone || "",
                      email: client.email || "",
                      address: client.address || "",
                      siteName: client.siteName || "",
                      startDate: client.startDate || "",
                      endDate: client.endDate || "",
                      foundation: client.foundation?.toString() || "",
                      framing: client.framing?.toString() || "",
                      electrics: client.electrics?.toString() || "",
                      plumbing: client.plumbing?.toString() || "",
                      totalAmount: client.totalAmount?.toString() || "",
                      paidAmount: client.paidAmount?.toString() || "",
                      managerName: client.managerName || "",
                      managerEmail: client.managerEmail || "",
                      managerPhone: client.managerPhone || "",
                      status: client.status || "working",
                    });
                    setShowModal(true);
                  }}
                >
                  Update
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(client._id)}
                >
                  Delete
                </button>
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box big">
            <h3>{editId ? "Update Client" : "Add Client"}</h3>
            <form onSubmit={handleAddClient}>
              <input
                name="name"
                placeholder="Company Name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                name="contact"
                placeholder="Contact Name"
                value={formData.contact}
                onChange={handleChange}
              />
              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
              <input
                name="siteName"
                placeholder="Site Name"
                value={formData.siteName}
                onChange={handleChange}
              />
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
              <input
                name="managerName"
                placeholder="Manager Name"
                value={formData.managerName}
                onChange={handleChange}
              />
              <input
                name="managerEmail"
                placeholder="Manager Email"
                value={formData.managerEmail}
                onChange={handleChange}
              />
              <input
                name="managerPhone"
                placeholder="Manager Phone"
                value={formData.managerPhone}
                onChange={handleChange}
              />
              <input
                name="foundation"
                placeholder="Foundation %"
                value={formData.foundation}
                onChange={handleChange}
              />
              <input
                name="framing"
                placeholder="Framing %"
                value={formData.framing}
                onChange={handleChange}
              />
              <input
                name="electrics"
                placeholder="Electrics %"
                value={formData.electrics}
                onChange={handleChange}
              />
              <input
                name="plumbing"
                placeholder="Plumbing %"
                value={formData.plumbing}
                onChange={handleChange}
              />
              <input
                type="number"
                name="totalAmount"
                placeholder="Total"
                value={formData.totalAmount}
                onChange={handleChange}
              />
              <input
                type="number"
                name="paidAmount"
                placeholder="Paid"
                value={formData.paidAmount}
                onChange={handleChange}
              />
              <input type="number" value={dueAmount} readOnly />
              <div className="modal-actions">
                <button type="submit">{editId ? "Update" : "Save"}</button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditId(null);
                    setFormData({
                      name: "",
                      contact: "",
                      phone: "",
                      email: "",
                      address: "",
                      siteName: "",
                      startDate: "",
                      endDate: "",
                      foundation: "",
                      framing: "",
                      electrics: "",
                      plumbing: "",
                      totalAmount: "",
                      paidAmount: "",
                      managerName: "",
                      managerEmail: "",
                      managerPhone: "",
                      status: "working",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAILS DASHBOARD */}
      {selectedClient && (
        <SiteProjectDetails
          client={selectedClient}
          onBack={() => setSelectedClient(null)}
        />
      )}
    </div>
  );
}

// Dashboard-style details view
function SiteProjectDetails({ client, onBack }) {
  // Debug: Log client data to see what's received
  console.log("SiteProjectDetails - client data:", client);
  console.log("Foundation:", client?.foundation, "Framing:", client?.framing);

  // Data for bar graph
  const barData = {
    labels: ["Foundation", "Framing", "Electrics", "Plumbing"],
    datasets: [
      {
        label: "Progress (%)",
        data: [
          client.foundation || 0,
          client.framing || 0,
          client.electrics || 0,
          client.plumbing || 0,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Project Progress",
        color: "#fff",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "#fff",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="dashboard-details">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>
      <div className="dashboard-grid">
        <div className="dashboard-card info">
          <h3>👤 Client Information</h3>
          <div className="info-item">
            <span className="label">Company:</span>
            <span className="value">{client.name}</span>
          </div>
          <div className="info-item">
            <span className="label">Contact:</span>
            <span className="value">{client.contact}</span>
          </div>
          <div className="info-item">
            <span className="label">Phone:</span>
            <span className="value">{client.phone}</span>
          </div>
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{client.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Site:</span>
            <span className="value">{client.siteName}</span>
          </div>
          <div className="info-item">
            <span className="label">Address:</span>
            <span className="value">{client.address}</span>
          </div>
        </div>

        <div className="dashboard-card graph">
          <div className="chart-container">
            <Bar data={barData} options={barOptions} />
          </div>
          <div className="progress-values">
            <div className="progress-value-row">
              <span>Foundation:</span>
              <span>{client.foundation || 0}%</span>
            </div>
            <div className="progress-value-row">
              <span>Framing:</span>
              <span>{client.framing || 0}%</span>
            </div>
            <div className="progress-value-row">
              <span>Electrics:</span>
              <span>{client.electrics || 0}%</span>
            </div>
            <div className="progress-value-row">
              <span>Plumbing:</span>
              <span>{client.plumbing || 0}%</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card manager">
          <h3>👨‍💼 Manager Details</h3>
          <div className="info-item">
            <span className="label">Name:</span>
            <span className="value">{client.managerName}</span>
          </div>
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{client.managerEmail}</span>
          </div>
          <div className="info-item">
            <span className="label">Phone:</span>
            <span className="value">{client.managerPhone}</span>
          </div>
        </div>

        <div className="dashboard-card payment">
          <h3>💰 Payment Info</h3>
          <div className="payment-item">
            <span>Total:</span>
            <span>₹{client.totalAmount?.toLocaleString()}</span>
          </div>
          <div className="payment-item paid">
            <span>Paid:</span>
            <span>₹{client.paidAmount?.toLocaleString()}</span>
          </div>
          <div className="payment-item due">
            <span>Due:</span>
            <span>
              ₹{(client.totalAmount - client.paidAmount)?.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="dashboard-card dates">
          <h3>📅 Site Dates</h3>
          <div className="date-item">
            <span>Start:</span>
            <span>{client.startDate || "-"}</span>
          </div>
          <div className="date-item">
            <span>End:</span>
            <span>{client.endDate || "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
