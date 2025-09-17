import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStudents, deleteStudent } from "../api/studentApi.js";

export default function StudentList(){
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(true);
  const [err,setErr] = useState("");

  useEffect(()=>{
    (async()=>{
      try {
        const items = await getStudents();
        setData(items);
        setErr("");
      } catch (e) {
        setErr("No se pudo cargar el listado.");
      } finally {
        setLoading(false);
      }
    })();
  },[]);

  const onDelete = async (id)=>{
    if(!confirm("¿Eliminar?")) return;
    try{
      await deleteStudent(id);
      setData(prev=>prev.filter(s=>s.id!==id));
    }catch(e){
      alert("No se pudo eliminar.");
    }
  };

  if(loading) return <p>Cargando...</p>;
  if(err) return <p style={{color:"crimson"}}>{err}</p>;

    return (
        <div className="card">
            <div className="row" style={{justifyContent:"space-between", alignItems:"center"}}>
                <div>
                    <h3 style={{margin:"0 0 6px"}}>Listado de Estudiantes</h3>
                    <p className="muted" style={{margin:0}}>Gestiona, edita o elimina registros</p>
                </div>
                <Link className="btn primary" to="/students/new">➕ Nuevo</Link>
            </div>

            <div className="space"></div>

            {data.length===0 ? (
                <div className="center muted">Sin registros.</div>
            ) : (
                <div className="table-wrap">
                    <table>
                        <thead>
                        <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Acciones</th></tr>
                        </thead>
                        <tbody>
                        {data.map(s=>(
                            <tr key={s.id}>
                                <td>{s.id}</td>
                                <td>{s.name}</td>
                                <td>{s.email}</td>
                                <td>
                                    <div className="row">
                                        <Link className="btn" to={`/students/edit/${s.id}`}>✏️ Editar</Link>
                                        <button className="btn danger" onClick={()=>onDelete(s.id)}>🗑 Eliminar</button>
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
