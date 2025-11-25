import React, { useEffect, useState } from "react";
import { Container, Spinner, Alert, Accordion } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavbarAbogado from "./NavbarAbogado";

import background_abogado from "../background_abogado.jpg";

export default function HomeAbogado() {
  console.log('Rendering HomeAbogado');
  const { username } = useParams();
  const [casos, setCasos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const nombreAbogado = localStorage.getItem("nombre") || username;

  useEffect(() => {
    // Simulación de casos
    const casosSimulados = [
      { id: 1, titulo: "Divorcio - Familia Rodríguez", cliente: "Ana Rodríguez", estado: "En progreso" },
      { id: 2, titulo: "Demanda laboral - Empresa X", cliente: "Luis Vargas", estado: "Pendiente" },
      { id: 3, titulo: "Accidente de tránsito - Caso Pérez", cliente: "Marcos Pérez", estado: "Investigación" },
    ];

    setCasos(casosSimulados);
    setLoading(false);
  }, []);

  return (
    <div
      className="home-abogado-wrapper"
      style={{
        backgroundImage: `url(${background_abogado})`,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <NavbarAbogado />

      <Container className="home-abogado-container mt-4" style={{ backgroundColor: "rgba(30, 30, 30, 0.9)" }}>
        <h2 className="home-abogado-title text-center mb-4">
          Bienvenido, {nombreAbogado}
        </h2>

        {loading && (
          <div className="text-center text-light">
            <Spinner animation="border" />
            <p>Cargando casos...</p>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <Accordion className="acordeon-abogado">
            {casos.map((c) => (
              <Accordion.Item eventKey={c.id.toString()} key={c.id} className="acordeon-item">
                <Accordion.Header className="acordeon-header">
                  {c.titulo} - <span>{c.estado}</span>
                </Accordion.Header>
                <Accordion.Body className="acordeon-body">
                  <p>Cliente: {c.cliente}</p>
                  <p>Estado: {c.estado}</p>
                  <p>Descripción: Información detallada del caso...</p>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </Container>
    </div>
  );
}
