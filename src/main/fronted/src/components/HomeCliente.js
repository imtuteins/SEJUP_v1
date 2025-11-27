import React, { useState, useEffect } from "react";
import { Container, Spinner, Alert, Table, Button, Modal, Form } from "react-bootstrap";
import NavbarCliente from "./NavbarCliente";
import axios from "axios";
import background_cliente from "../background_cliente.jpg";
import "../styles/homecliente.css";

export default function HomeCliente() {
  console.log('Rendering HomeCliente');
  const [casos, setCasos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCaso, setNewCaso] = useState({
    titulo: '',
    descripcion: '',
    esDemandado: false
  });

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

      const res = await axios.get('http://localhost:8080/caso/mis-casos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCasos(res.data);
    } catch (err) {
      setError('No se pudieron cargar los casos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCaso = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:8080/caso/crear-caso', {
        titulo: newCaso.titulo,
        descripcion: newCaso.descripcion,
        esDemandado: newCaso.esDemandado
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowModal(false);
      setNewCaso({ titulo: '', descripcion: '', esDemandado: false });
      fetchCasos();
    } catch (err) {
      console.error('Error al crear caso:', err);
      alert('Error al crear el caso');
    }
  };

  return (
    <div
      className="homecliente-wrapper"
      style={{ backgroundImage: `url(${background_cliente})` }}
    >
      <NavbarCliente />

      <Container className="mt-4 homecliente-content" style={{ maxWidth: "900px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-center mb-0 text-white">📋 Mis Casos</h2>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            + Crear Nuevo Caso
          </Button>
        </div>

        {loading && (
          <div className="text-center text-white">
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
          <Table striped bordered hover responsive variant="light" className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Tipo</th>
                <th>Abogado Asignado</th>
              </tr>
            </thead>
            <tbody>
              {casos.map((caso, index) => (
                <tr key={caso.id}>
                  <td>{index + 1}</td>
                  <td>{caso.titulo}</td>
                  <td>{caso.descripcion}</td>
                  <td>{caso.esDemandado ? 'Demandado' : 'Demandante'}</td>
                  <td>{caso.abogado ? caso.abogado.username : 'Sin asignar'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {!loading && casos.length === 0 && !error && (
          <Alert variant="info" className="text-center">No tienes casos registrados. ¡Crea tu primer caso!</Alert>
        )}

        {/* Modal para crear caso */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Crear Nuevo Caso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCreateCaso}>
              <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  value={newCaso.titulo}
                  onChange={(e) => setNewCaso({ ...newCaso, titulo: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newCaso.descripcion}
                  onChange={(e) => setNewCaso({ ...newCaso, descripcion: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="¿Es demandado?"
                  checked={newCaso.esDemandado}
                  onChange={(e) => setNewCaso({ ...newCaso, esDemandado: e.target.checked })}
                />
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Crear Caso
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}
