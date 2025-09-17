import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createStudent, getStudentById, updateStudent } from "../api/studentApi.js";

export default function StudentForm(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [form,setForm] = useState({ name:"", email:"" });
  const [loading,setLoading] = useState(!!id);
  const [err,setErr] = useState("");

  useEffect(()=>{
    if(!id) return;
    (async()=>{
      try{
        const s = await getStudentById(id);
        setForm({ name: s?.name ?? "", email: s?.email ?? "" });
      }catch(e){
        setErr("No se pudo cargar el estudiante.");
      }finally{
        setLoading(false);
      }
    })();
  },[id]);

  const submit = async (e)=>{
    e.preventDefault();
    if(!form.name.trim() || !form.email.trim()){
      setErr("Nombre y Email son obligatorios.");
      return;
    }
    try{
      if(id){
        await updateStudent(id, form);
        alert("Actualizado");
      }else{
        await createStudent(form);
        alert("Creado");
      }
      navigate("/");
    }catch(e){
      setErr("Error al guardar.");
    }
  };

  if(loading) return <p>Cargando...</p>;

    return (
        <div className="card">
            <h3 style={{marginTop:0}}>{id ? "Editar" : "Nuevo"} Estudiante</h3>
            {err && <p style={{color:"#fecaca", background:"rgba(239,68,68,.15)", border:"1px solid rgba(239,68,68,.35)", padding:"8px 12px", borderRadius:"12px"}}>{err}</p>}
            <form onSubmit={submit} className="form">
                <div>
                    <label className="label">Nombre</label>
                    <input className="input" value={form.name} onChange={e=>setForm(v=>({...v, name:e.target.value}))} placeholder="Ada Lovelace"/>
                </div>
                <div>
                    <label className="label">Email</label>
                    <input className="input" type="email" value={form.email} onChange={e=>setForm(v=>({...v, email:e.target.value}))} placeholder="ada@ejemplo.com"/>
                </div>
                <div className="row">
                    <button className="btn primary" type="submit">{id ? "Actualizar" : "Crear"}</button>
                    <button className="btn" type="button" onClick={()=>navigate("/students")}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
