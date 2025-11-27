import React, { useEffect, useState } from "react";
import { Container, Spinner, Alert, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavbarAbogado from "./NavbarAbogado";
import axios from "axios";

import background_abogado from "../background_abogado.jpg";

export default function HomeAbogado() {
  console.log('Rendering HomeAbogado');
  const { username } = useParams();
  const [casos, setCasos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const nombreAbogado = localStorage.getItem("nombre") || username;

  useEffect(() => {
    fetchCasos();
  }, []);

  const fetchCasos = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No hay token. Inicia sesión primero.');
        setLoading(false);
        return;
      }

      const res = await axios.get('http://localhost:8080/caso/mis-casos-abogado', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCasos(res.data);
    } catch (err) {
      setError('No se pudieron cargar los casos asignados.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

      <Container className="home-abogado-container mt-4" style={{ backgroundColor: "rgba(30, 30, 30, 0.9)", padding: "20px", borderRadius: "10px" }}>
        <h2 className="home-abogado-title text-center mb-4 text-light">
          Bienvenido, {nombreAbogado}
        </h2>
        <h3 className="mb-4 text-light">⚖️ Mis Casos Asignados</h3>

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

        {!loading && casos.length > 0 && (
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Tipo</th>
                <th>Cliente</th>
              </tr>
            </thead>
            <tbody>
              {casos.map((caso, index) => (
                <tr key={caso.id}>
                  <td>{index + 1}</td>
                  <td>{caso.titulo}</td>
                  <td>{caso.descripcion}</td>
                  <td>{caso.esDemandado ? 'Demandado' : 'Demandante'}</td>
                  <td>{caso.cliente ? caso.cliente.username : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {!loading && casos.length === 0 && !error && (
          <Alert variant="info">No tienes casos asignados actualmente.</Alert>
        )}
      </Container>
    </div>
  );
}
