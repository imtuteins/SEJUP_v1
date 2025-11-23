import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../logo_removed.png';

function NavbarAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="navbar-global">
      <Container>

        {/* LOGO + TÍTULO */}
        <Navbar.Brand className="d-flex align-items-center">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <span className="navbar-title">SEJUP - Admin</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="admin-navbar" />

        <Navbar.Collapse id="admin-navbar">

          {/* LINKS */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="clientes" className="nav-link">
              Listado de Clientes
            </Nav.Link>

            <Nav.Link as={NavLink} to="abogados" className="nav-link">
              Listado de Abogados
            </Nav.Link>

            <Nav.Link as={NavLink} to="casos" className="nav-link">
              Listado de Casos
            </Nav.Link>
          </Nav>

          {/* CERRAR SESIÓN */}
          <Button className="navbar-logout" onClick={handleLogout}>
            Salir
          </Button>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarAdmin;


