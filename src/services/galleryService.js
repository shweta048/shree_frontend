import api from "./api";

export const getGallery = () => api.get("/gallery");

export const getGalleryById = (id) => api.get(`/gallery/${id}`);

// ✅ CREATE (with image)
export const createGallery = (data) => {
  const formData = new FormData();

  formData.append("title", data.title); // text field
  formData.append("description", data.description); // text field
  formData.append("image", data.image); // file (important)

  return api.post("/gallery", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ UPDATE (with image optional)
export const updateGallery = (id, data) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);

  // only append image if exists
  if (data.image) {
    formData.append("image", data.image);
  }

  return api.put(`/gallery/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteGallery = (id) => api.delete(`/gallery/${id}`);
