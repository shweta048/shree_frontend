import api from "./api";

// GET all news
export const getNews = () => api.get("/news");

// GET by ID
export const getNewsById = (id) => api.get(`/news/${id}`);

// ✅ CREATE (with image)
export const createnews = (data) => {
  const formData = new FormData();

  formData.append("title", data.title); // text
  formData.append("description", data.description); // text
  formData.append("image", data.image); // file (important)

  return api.post("/news", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ UPDATE (image optional)
export const updateNews = (id, data) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);

  // only send image if selected
  if (data.image) {
    formData.append("image", data.image);
  }

  return api.put(`/news/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// DELETE
export const deletenews = (id) => api.delete(`/news/${id}`);
