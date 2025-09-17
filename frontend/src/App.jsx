import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import StudentList from "./pages/StudentList.jsx";
import StudentForm from "./pages/StudentForm.jsx";
import TeacherList from "./pages/TeacherList.jsx";
import TeacherForm from "./pages/TeacherForm.jsx";

export default function App(){
  return (
    <BrowserRouter>
        <header className="header">
            <div className="header-inner container">
                <span className="badge">React + Spring Boot</span>
                <h2 style={{margin:0}}>CRUD</h2>
            </div>
        </header>
        <main className="container">
            <ErrorBoundary>
          <Routes>
            {/* Rutas Estudiantes */}
            <Route path="/students" element={<StudentList/>} />
            <Route path="/students/new/" element={<StudentForm/>} />
            <Route path="/students/edit/:id" element={<StudentForm/>} />
            {/* Rutas Profesores */}
            <Route path="/teachers" element={<TeacherList/>} />
            <Route path="/teachers/new" element={<TeacherForm/>} />
            <Route path="/teachers/edit/:id" element={<TeacherForm/>} />
          </Routes>
        </ErrorBoundary>
      </main>
    </BrowserRouter>
  );
}
