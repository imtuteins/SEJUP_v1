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
          <Route path="/dashboard_admin/*" element={<HomeAdmin />} />
          <Route path="/dashboard_abogado/*" element={<HomeAbogado />} />
          <Route path="/dashboard_cliente/*" element={<HomeCliente />} />

          {/* Fallback para rutas no encontradas */}
          <Route path="*" element={<Navigate to="/home" />} />


        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;

