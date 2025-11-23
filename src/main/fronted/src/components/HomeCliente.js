import React, { useState, useEffect } from "react";
import { Container, Spinner, Alert, Accordion } from "react-bootstrap";
import NavbarCliente from "./NavbarCliente";
import background_cliente from "../background_cliente.jpg";
import "../styles/homecliente.css";

export default function HomeCliente() {
  const [actualizaciones, setActualizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const datosSimulados = [
      { id: 1, texto: "🔴 Caso cerrado el 10/11/2025", fecha: "2025-11-10" },
      { id: 2, texto: "🟡 Audiencia programada para el 15/11/2025", fecha: "2025-11-05" },
      { id: 3, texto: "🟢 Documentos recibidos correctamente", fecha: "2025-10-30" },
    ];

    setActualizaciones(datosSimulados);
    setLoading(false);
  }, []);

  return (
    <div
      className="homecliente-wrapper"
      style={{ backgroundImage: `url(${background_cliente})` }}
    >
      <NavbarCliente />

      <Container className="mt-4 homecliente-content" style={{ maxWidth: "650px" }}>
        <h2 className="text-center mb-4">Actualizaciones de Mi Caso</h2>

        {loading && (
          <div className="text-center">
            <Spinner animation="border" />
            <p>Cargando actualizaciones...</p>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <Accordion alwaysOpen className="updates-accordion">
            {actualizaciones.map(({ id, texto, fecha }, index) => (
              <Accordion.Item eventKey={index.toString()} key={id} className="accordion-item-custom">
                <Accordion.Header>
                  <strong>{fecha}</strong> — Actualización #{id}
                </Accordion.Header>

                <Accordion.Body>
                  {texto}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </Container>
    </div>
  );
}
