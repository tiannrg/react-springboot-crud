import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" }
});

api.interceptors.response.use(
  (res)=>res,
  (err)=>{ console.error(err?.response || err); return Promise.reject(err); }
);

export const getTeachers = () => api.get("/teachers").then(r=>r.data);
export const getTeacherById = (id) => api.get(`/teachers/${id}`).then(r=>r.data);
export const createTeacher = (teacher) => api.post("/teachers",teacher).then(r=>r.data);
export const updateTeacher = (id, teacher) => api.put(`/teachers/${id}`, teacher).then(r=>r.data);
export const deleteTeacher = (id) => api.delete(`/teachers/${id}`).then(r => r.status === 204 || r.status === 200);
