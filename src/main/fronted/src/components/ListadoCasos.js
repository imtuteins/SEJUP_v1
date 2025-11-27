import React, { useEffect, useState } from "react";
import { Container, Table, Button, Alert, Spinner, Modal, Form } from "react-bootstrap";

function ListadoCasos() {
  const [casos, setCasos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [abogados, setAbogados] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedCaso, setSelectedCaso] = useState(null);
  const [modalType, setModalType] = useState(""); // 'cliente' or 'abogado'
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No hay token. Inicia sesión primero.");
        setLoading(false);
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      // Fetch Casos
      const resCasos = await fetch(`http://localhost:8080/caso/todos`, { headers });
      if (resCasos.ok) setCasos(await resCasos.json());

      // Fetch Clientes (Usuarios)
      const resClientes = await fetch(`http://localhost:8080/admin/usuarios`, { headers });
      if (resClientes.ok) {
        const allUsers = await resClientes.json();
        // Filter for clients if possible, otherwise show all. Assuming ROLE_CLIENTE exists or just show all.
        // Based on ListadoClientes, roles are objects {name: "ROLE_..."}
        setClientes(allUsers.filter(u => u.rol?.name === "ROLE_CLIENTE"));
      }

      // Fetch Abogados
      const resAbogados = await fetch(`http://localhost:8080/admin/abogados`, { headers });
      if (resAbogados.ok) setAbogados(await resAbogados.json());

    } catch (err) {
      setError("Error al cargar datos.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (caso, type) => {
    setSelectedCaso(caso);
    setModalType(type);
    setSelectedUser("");
    setShowModal(true);
  };

  const handleAssign = async () => {
    if (!selectedUser) return;

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      let url = "";
      let method = "PUT";

      if (modalType === "cliente") {
        url = `http://localhost:8080/caso/${selectedCaso.id}/asignar-cliente/${selectedUser}`;
      } else {
        // For lawyer assignment, existing endpoint uses body
        url = `http://localhost:8080/caso/asignar`;
        const body = JSON.stringify({ idCaso: selectedCaso.id, idAbogado: selectedUser });

        const res = await fetch(url, { method, headers, body });
        if (res.ok) {
          fetchData();
          setShowModal(false);
          return;
        }
      }

      if (modalType === "cliente") {
        const res = await fetch(url, { method, headers });
        if (res.ok) {
          fetchData();
          setShowModal(false);
        } else {
          alert("Error al asignar");
        }
      }

    } catch (err) {
      alert("Error de conexión");
    }
  };

  const handleUnassign = async (caso, type) => {
    if (!window.confirm(`¿Desasignar ${type}?`)) return;

    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      let url = "";

      if (type === "cliente") {
        url = `http://localhost:8080/caso/${caso.id}/desasignar-cliente`;
      } else {
        url = `http://localhost:8080/caso/${caso.id}/desasignar-abogado`;
      }

      const res = await fetch(url, { method: "PUT", headers });
      if (res.ok) {
        fetchData();
      } else {
        alert("Error al desasignar");
      }
    } catch (err) {
      alert("Error de conexión");
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Listado de Casos</h3>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Cliente</th>
              <th>Abogado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {casos.map((caso) => (
              <tr key={caso.id}>
                <td>{caso.id}</td>
                <td>{caso.titulo}</td>
                <td>
                  {caso.cliente ? (
                    <>
                      {caso.cliente.username}
                      <Button variant="outline-danger" size="sm" className="ms-2" onClick={() => handleUnassign(caso, "cliente")}>X</Button>
                    </>
                  ) : (
                    <Button variant="outline-primary" size="sm" onClick={() => handleOpenModal(caso, "cliente")}>Asignar</Button>
                  )}
                </td>
                <td>
                  {caso.abogado ? (
                    <>
                      {caso.abogado.username}
                      <Button variant="outline-danger" size="sm" className="ms-2" onClick={() => handleUnassign(caso, "abogado")}>X</Button>
                    </>
                  ) : (
                    <Button variant="outline-primary" size="sm" onClick={() => handleOpenModal(caso, "abogado")}>Asignar</Button>
                  )}
                </td>
                <td>
                  {/* Placeholder for other actions if needed */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Asignar {modalType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">Seleccionar...</option>
            {modalType === "cliente"
              ? clientes.map(c => <option key={c.id} value={c.id}>{c.username}</option>)
              : abogados.map(a => <option key={a.id} value={a.id}>{a.username}</option>)
            }
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleAssign}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ListadoCasos;
