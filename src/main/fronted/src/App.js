import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

import HomePage from "./components/HomePage";
import HomeAdmin from "./components/HomeAdmin";
import HomeAbogado from "./components/HomeAbogado";
import HomeCliente from "./components/HomeCliente";

// Si después agregas rutas internas (clientes, abogados, casos)
// las importas aquí, por ejemplo:
// import ListadoClientes from "./components/ListadoClientes";

function App() {
  return (
    <GoogleOAuthProvider clientId="1038265379119-mbtaqfbva0d629656op6oimgppjlcbfe.apps.googleusercontent.com">
      <Router>
        <Routes>

          {/* Redirección base */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Página pública */}
          <Route path="/home" element={<HomePage />} />

          {/* Dashboards */}
          <Route path="/dashboard_admin/:username" element={<HomeAdmin />} />
          <Route path="/dashboard_abogado/:username" element={<HomeAbogado />} />
          <Route path="/dashboard_cliente/:username" element={<HomeCliente />} />

          {/* Si quieres agregar rutas adicionales después:
          <Route path="/dashboard_admin/:username/clientes" element={<ListadoClientes />} />
          <Route path="/dashboard_admin/:username/abogados" element={<ListadoAbogados />} /> 
          */}
          
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;

