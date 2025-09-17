import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" }
});

api.interceptors.response.use(
  (res)=>res,
  (err)=>{ console.error(err?.response || err); return Promise.reject(err); }
);

export const getStudents = () => api.get("/students").then(r=>r.data);
export const getStudentById = (id) => api.get(`/students/${id}`).then(r=>r.data);
export const createStudent = (student) => api.post("/students", student).then(r=>r.data);
export const updateStudent = (id, student) => api.put(`/students/${id}`, student).then(r=>r.data);
export const deleteStudent = (id) => api.delete(`/students/${id}`).then(r => r.status === 204 || r.status === 200);
