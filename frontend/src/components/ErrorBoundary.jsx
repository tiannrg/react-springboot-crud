import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { hasError:false, error:null }; }
  static getDerivedStateFromError(error){ return { hasError:true, error }; }
  componentDidCatch(error, info){ console.error("UI error:", error, info); }
  render(){
    if(this.state.hasError){
      return (<div style={{padding:"1rem", border:"1px solid #f99", background:"#fee"}}>
        <h3 style={{color:"#c00"}}>Error en la interfaz</h3>
        <pre style={{whiteSpace:"pre-wrap"}}>{String(this.state.error)}</pre>
      </div>);
    }
    return this.props.children;
  }
}
