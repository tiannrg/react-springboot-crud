import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTeacher, getTeacherById, updateTeacher } from "../api/teacherApi.js";

export default function TeacherForm(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [form,setForm] = useState({ name:"", salary:"",type:"" ,year_integration:"" });
  const [loading,setLoading] = useState(!!id);
  const [err,setErr] = useState("");

  useEffect(()=>{
    if(!id) return;
    (async()=>{
      try{
        const s = await getTeacherById(id);
        setForm({ name: s?.name ?? "", salary: s?.salary ?? "" ,type: s?.type ?? "" ,year_integration: s?.year_integration ?? "" });
      }catch(e){
        setErr("No se pudo cargar el profesor.");
      }finally{
        setLoading(false);
      }
    })();
  },[id]);

  const submit = async (e)=>{
    e.preventDefault();
    if(!form.name.trim() || !form.salary.trim()|| !form.type.trim()|| !form.year_integration.trim()){
      setErr("Todos los datos son obligatorios.");
      return;
    }
    try{
      if(id){
        await updateTeacher(id, form);
        alert("Actualizado");
      }else{
        await createTeacher(form);
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
            <h3 style={{marginTop:0}}>{id ? "Editar" : "Nuevo"} Profesor</h3>
            {err && <p style={{color:"#fecaca", background:"rgba(239,68,68,.15)", border:"1px solid rgba(239,68,68,.35)", padding:"8px 12px", borderRadius:"12px"}}>{err}</p>}
            <form onSubmit={submit} className="form">
                <div>
                    <label className="label">Nombre</label>
                    <input className="input" value={form.name} onChange={e=>setForm(v=>({...v, name:e.target.value}))} placeholder="Ada Lovelace"/>
                </div>
                <div>
                    <label className="label">Salario</label>
                    <input className="input" type="salary" value={form.salary} onChange={e=>setForm(v=>({...v, salary:e.target.value}))} placeholder="1.200.000"/>
                </div>
                <div>
                    <label className="label">Tipo</label>
                    <input className="input" type="type" value={form.type} onChange={e=>setForm(v=>({...v, type:e.target.value}))} placeholder="Turno completo"/>
                </div>
                <div>
                    <label className="label">Año de ingreso</label>
                    <input className="input" type="year_integration" value={form.year_integration} onChange={e=>setForm(v=>({...v, year_integration:e.target.value}))} placeholder="2024"/>
                </div>
                <div className="row">
                    <button className="btn primary" type="submit">{id ? "Actualizar" : "Crear"}</button>
                    <button className="btn" type="button" onClick={()=>navigate("/teachers")}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
