import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ModalCalendario from "./ModalCalendario";
import logo from "../logo_removed.png";
import user from "../user.png"
import "../styles/navbar.css";
import "../styles/homeabogado.css";

export default function NavbarAbogado() {
  const navigate = useNavigate();
  const [showAgenda, setShowAgenda] = useState(false);

  const nombreAbogado = localStorage.getItem("nombre") || "Abogado";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/home");
  };

  const handleSubirArchivos = () => {
    alert("Funcionalidad de subir archivos en desarrollo");
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        sticky="top"
        className="navbar-global"
      >
        <Container className="navbar-container">
          <Navbar.Brand
            className="navbar-logo-section"
            onClick={() =>
              navigate(`/dashboard_abogado/${localStorage.getItem("username")}`)
            }
          >
            <img
              src={logo}
              alt="Logo"
              className="navbar-logo"
            />
            <span className="navbar-title">SEJUP</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="abogado-navbar" />

          <Navbar.Collapse
            id="abogado-navbar"
            className="navbar-content"
          >
            <Nav className="me-auto navbar-links">
              <Nav.Link
                onClick={() =>
                  navigate(`/dashboard_abogado/${localStorage.getItem("username")}`)
                }
              >
                Casos Activos
              </Nav.Link>

              <Nav.Link onClick={() => setShowAgenda(true)}>
                Agenda
              </Nav.Link>

              <Nav.Link onClick={handleSubirArchivos}>
                Subir Archivos
              </Nav.Link>
            </Nav>
              <div className="navbar-user-info">
                <img
                  src={user} //Devolver el username para colocarlo en alt
                  alt="Usuario"
                  className="navbar-user-photo"
                />
                <span className="navbar-title">
                  {localStorage.getItem("nombre") || "Usuario"}
                </span>
              </div>
            <Button
              variant="outline-light"
              className="navbar-logout"
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal Agenda */}
      <ModalCalendario
        show={showAgenda}
        handleClose={() => setShowAgenda(false)}
      />
    </>
  );
}
