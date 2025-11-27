import React, { useEffect, useState } from 'react';
import { Container, Table, Alert, Spinner, Button, Modal, Form } from 'react-bootstrap';
import NavbarAdmin from './NavbarAdmin';
import axios from 'axios';
import "../styles/homeadmin.css"; // Importar estilos

function HomeAdmin() {
  const [casos, setCasos] = useState([]);
  const [abogados, setAbogados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCaso, setSelectedCaso] = useState(null);
  const [selectedAbogado, setSelectedAbogado] = useState('');

  useEffect(() => {
    fetchCasos();
    fetchAbogados();
  }, []);

  const fetchCasos = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No hay token. Inicia sesión primero.');
        setLoading(false);
        return;
      }

      const res = await axios.get('http://localhost:8080/caso/todos', {
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

  const fetchAbogados = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/admin/abogados', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAbogados(res.data);
    } catch (err) {
      console.error('Error al cargar abogados:', err);
    }
  };

  const handleAsignar = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8080/caso/asignar', {
        idCaso: selectedCaso.id,
        idAbogado: parseInt(selectedAbogado)
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowModal(false);
      setSelectedCaso(null);
      setSelectedAbogado('');
      fetchCasos();
    } catch (err) {
      console.error('Error al asignar caso:', err);
      alert('Error al asignar el caso');
    }
  };

  const openAsignarModal = (caso) => {
    setSelectedCaso(caso);
    setShowModal(true);
  };

  return (
    <>
      <NavbarAdmin />
      <Container className="mt-4 home-admin-container">
        <h3 className="mb-4 home-admin-title">🏛️ Todos los Casos del Sistema</h3>

        {loading && (
          <div className="text-center">
            <Spinner animation="border" variant="warning" />
            <p>Cargando casos...</p>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && casos.length > 0 && (
          <Table striped bordered hover responsive className="table-admin">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Tipo</th>
                <th>Cliente</th>
                <th>Abogado</th>
                <th>Acciones</th>
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
                  <td>{caso.abogado ? caso.abogado.username : 'Sin asignar'}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => openAsignarModal(caso)}
                    >
                      {caso.abogado ? 'Reasignar' : 'Asignar'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {!loading && casos.length === 0 && !error && (
          <Alert variant="info">No hay casos en el sistema.</Alert>
        )}

        {/* Modal para asignar abogado */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Asignar Abogado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedCaso && (
              <>
                <p><strong>Caso:</strong> {selectedCaso.titulo}</p>
                <Form.Group>
                  <Form.Label>Seleccionar Abogado</Form.Label>
                  <Form.Select
                    value={selectedAbogado}
                    onChange={(e) => setSelectedAbogado(e.target.value)}
                  >
                    <option value="">-- Seleccione un abogado --</option>
                    {abogados.map((abogado) => (
                      <option key={abogado.id} value={abogado.id}>
                        {abogado.username}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleAsignar}
              disabled={!selectedAbogado}
            >
              Asignar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default HomeAdmin;
