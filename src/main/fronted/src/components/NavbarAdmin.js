import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../logo_removed.png';
import userImg from '../user.png';
import '../styles/navbar.css';

// Importar los componentes de listado
import ListadoClientes from "./ListadoClientes";
import ListadoAbogados from "./ListadoAbogados";
import ListadoCasos from "./ListadoCasos";
import ModalSubirArchivo from "./ModalSubirArchivo";

function NavbarAdmin() {
  const navigate = useNavigate();

  // Estados para los modales
  const [showClientes, setShowClientes] = useState(false);
  const [showAbogados, setShowAbogados] = useState(false);
  const [showCasos, setShowCasos] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    navigate('/');
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-global">
        <Container>

          {/* LOGO + TÍTULO */}
          <Navbar.Brand className="d-flex align-items-center">
            <img src={logo} alt="Logo" className="navbar-logo" />
            <span className="navbar-title">ADMINISTRADOR</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="admin-navbar" />

          <Navbar.Collapse id="admin-navbar">

            {/* LINKS (Ahora botones para modales) */}
            <Nav className="me-auto">
              <Nav.Link onClick={() => setShowClientes(true)} className="nav-link">
                Listado de Clientes
              </Nav.Link>

              <Nav.Link onClick={() => setShowAbogados(true)} className="nav-link">
                Listado de Abogados
              </Nav.Link>

              <Nav.Link onClick={() => setShowCasos(true)} className="nav-link">
                Listado de Casos
              </Nav.Link>

              <Nav.Link onClick={() => setShowUpload(true)} className="nav-link">
                Subir Archivos
              </Nav.Link>
            </Nav>

            <div className="navbar-user-info">
              <img src={userImg} alt="Usuario" className="navbar-user-photo" />
              <span className="navbar-title">
                {localStorage.getItem("username") || "Admin"}
              </span>
            </div>

            {/* CERRAR SESIÓN */}
            <Button className="navbar-logout" onClick={handleLogout}>
              Salir
            </Button>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* MODAL CLIENTES */}
      <Modal show={showClientes} onHide={() => setShowClientes(false)} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Gestión de Clientes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListadoClientes />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowClientes(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL ABOGADOS */}
      <Modal show={showAbogados} onHide={() => setShowAbogados(false)} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Gestión de Abogados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListadoAbogados />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAbogados(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL CASOS */}
      <Modal show={showCasos} onHide={() => setShowCasos(false)} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Gestión de Casos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListadoCasos />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCasos(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL SUBIR ARCHIVO */}
      <ModalSubirArchivo show={showUpload} handleClose={() => setShowUpload(false)} />
    </>
  );
}

export default NavbarAdmin;
