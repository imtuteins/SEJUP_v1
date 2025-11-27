import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../logo_removed.png";
import userImg from "../user.png";
import ModalSubirArchivo from "./ModalSubirArchivo";

function NavbarCliente() {
  console.log('Rendering NavbarCliente');
  const navigate = useNavigate();

  // Datos de usuario
  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem("user")) || {}; }
    catch { return {}; }
  })();
  const username = storedUser.username || localStorage.getItem("username") || "";
  const clienteId = storedUser.id || localStorage.getItem("clienteId") || "";

  // Estado modal y formulario
  const [showModal, setShowModal] = useState(false);
  const [showUpload, setShowUpload] = useState(false); // Estado para modal de subida
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [esDemandado, setEsDemandado] = useState(false);
  const [cliente, setCliente] = useState(clienteId || "");
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Estado para saber si hay caso activo
  const [casoActivoId, setCasoActivoId] = useState(
    localStorage.getItem("casoActivoId") || null
  );

  useEffect(() => {
    // Mantener sincronizado con localStorage si cambia desde otra parte
    const onStorage = () => {
      setCasoActivoId(localStorage.getItem("casoActivoId") || null);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleInicio = () => {
    if (username) navigate(`/dashboard_cliente/${username}`);
    else navigate("/home");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/");
  };

  const handleSubirArchivos = () => {
    setShowUpload(true);
  };

  const openModal = () => {
    setError(null);
    setSuccessMsg(null);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!titulo.trim() || !descripcion.trim() || !cliente) {
      setError("Completa título, descripción y cliente.");
      return;
    }

    setSubmitting(true);
    try {
      const nuevoCaso = {
        id: Date.now(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        esDemandado: Boolean(esDemandado),
        cliente: Number(cliente),
        creadoEn: new Date().toISOString(),
        activo: true
      };

      const existentes = JSON.parse(localStorage.getItem("casos") || "[]");

      // Opcional: marcar todos como no activos y activar solo el nuevo
      const actualizados = existentes.map(c => ({ ...c, activo: false }));
      actualizados.push(nuevoCaso);
      localStorage.setItem("casos", JSON.stringify(actualizados));

      // Guardar id de caso activo
      localStorage.setItem("casoActivoId", String(nuevoCaso.id));
      setCasoActivoId(String(nuevoCaso.id));

      setSuccessMsg("Caso creado y marcado como activo.");
      setTitulo("");
      setDescripcion("");
      setEsDemandado(false);
      // closeModal(); // opcional
    } catch (err) {
      setError("Error al guardar localmente.");
    } finally {
      setSubmitting(false);
    }
  };

  const foto = localStorage.getItem("foto") || userImg;

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar-global">
        <Container className="navbar-container">
          <Navbar.Brand
            className="navbar-logo-section"
            style={{ cursor: "pointer" }}
            onClick={handleInicio}
          >
            <img src={logo} alt="Logo" className="navbar-logo" />
            <span className="navbar-title">SEJUP</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="cliente-navbar" />
          <Navbar.Collapse id="cliente-navbar" className="navbar-content">
            <Nav className="me-auto navbar-links">
              <Nav.Link onClick={handleInicio}>Inicio</Nav.Link>
              <Nav.Link onClick={() => navigate('/casos')}>Mis Casos</Nav.Link>
              <Nav.Link onClick={() => navigate('/mensajeria')}>Mensajería</Nav.Link>
              <Nav.Item>
                <Nav.Link as={Button} variant="warning" onClick={openModal}>
                  Crear Caso
                </Nav.Link>
              </Nav.Item>
              {/* Subir Archivos */}
              <Nav.Link onClick={handleSubirArchivos}>Subir Archivos</Nav.Link>
            </Nav>

            <div className="navbar-user-info">
              <img src={foto} alt="Usuario" className="navbar-user-photo" />
              <span className="navbar-title">
                {localStorage.getItem("username") || "Usuario"}
              </span>
            </div>

            <div className="navbar-btn-group">
              <Button
                variant="outline-light"
                className="navbar-logout"
                onClick={handleLogout}
              >
                Salir
              </Button>

            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={closeModal} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Crear nuevo caso (local)</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <div className="text-danger mb-2">{error}</div>}
            {successMsg && <div className="text-success mb-2">{successMsg}</div>}

            <Form.Group className="mb-3" controlId="formTitulo">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título del caso"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción del caso"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEsDemandado">
              <Form.Check
                type="checkbox"
                label="Es demandado"
                checked={esDemandado}
                onChange={(e) => setEsDemandado(e.target.checked)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCliente">
              <Form.Label>Cliente (ID)</Form.Label>
              <Form.Control
                type="number"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                placeholder="ID del cliente"
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal} disabled={submitting}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? "Guardando..." : "Guardar y activar"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal de Subida de Archivos */}
      <ModalSubirArchivo show={showUpload} handleClose={() => setShowUpload(false)} />
    </>
  );
}

export default NavbarCliente;