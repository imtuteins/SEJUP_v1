import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useState } from "react";
import ContactoModal from "./ContactoModal";
import QuienesSomos from "./QuienesSomos";

import Login from "./Login"; 
import Register from "./Registro";

import logo from "../logo_removed.png";

export default function NavbarHomePage({
  onInicio,
  onClientes,
}) {

  // Estado del modal de contacto
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleOpenLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const [showContacto, setShowContacto] = useState(false);

  // Estado del modal Quiénes Somos
  const [showQS, setShowQS] = useState(false);

  const handleContactoOpen = () => setShowContacto(true);
  const handleContactoClose = () => setShowContacto(false);

  const handleQSOpen = () => setShowQS(true);
  const handleQSClose = () => setShowQS(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand style={{ cursor: "pointer" }} onClick={onInicio}>
            <img
              src={logo}
              alt="Logo"
              width="60"
              height="60"
              className="d-inline-block align-top me-2"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav className="me-auto">

              <Nav.Link onClick={onInicio} >Inicio</Nav.Link>
              <Nav.Link onClick={onClientes}>Nuestros Clientes</Nav.Link>

              {/* QUIÉNES SOMOS MODAL */}
              <Nav.Link className="navbar-link" onClick={handleQSOpen}>
                Quiénes Somos
              </Nav.Link>

              {/* CONTACTO */}
              <Nav.Link onClick={handleContactoOpen}>Contacto</Nav.Link>
            </Nav>
            <div className="navbar-btn-group">
              
              <Button variant="outline-light" className="navbar-btn-login" onClick={handleOpenLogin}>Iniciar sesión</Button>
              <Button variant="outline-light" className="navbar-btn-register" onClick={() => setShowRegister(true)}>Registrarse</Button>

              <Login show={showLogin} onClose={handleCloseLogin} />
              <Register show={showRegister} onClose={() => setShowRegister(false)} />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* MODAL DE CONTACTO */}
      <ContactoModal show={showContacto} handleClose={handleContactoClose} />

      {/* MODAL QUIÉNES SOMOS */}
      <QuienesSomos show={showQS} handleClose={handleQSClose} />
    </>
  );
}
