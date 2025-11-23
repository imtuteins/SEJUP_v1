import React from "react";
import { Routes, Route } from "react-router-dom";

import NavbarAdmin from "./NavbarAdmin";
import ListadoClientes from "./ListadoClientes";
import ListadoAbogados from "./ListadoAbogados";
import ListadoCasos from "./ListadoCasos";

function HomeAdmin() {
  return (
    <>
      <NavbarAdmin />

      <div className="container mt-4">
        <Routes>
          <Route path="clientes" element={<ListadoClientes />} />
          <Route path="abogados" element={<ListadoAbogados />} />
          <Route path="casos" element={<ListadoCasos />} />
        </Routes>
      </div>
    </>
  );
}

export default HomeAdmin;
