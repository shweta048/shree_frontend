import api from "./api";

export const getContact = () => api.get("/contact");
export const getContactById = (id) => api.get(`/contact/${id}`);
export const createContact = (contactData) => api.post("/contact", contactData);
export const updateContact = (id, contactData) =>
  api.put(`/courses/${id}`, contactData);
export const deleteContact = (id) => api.delete(`/contact/${id}`);
