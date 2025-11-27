import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../logo_removed.png';
import userImg from '../user.png';
import '../styles/navbar.css';

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
        <Navbar.Brand className="d-flex align-items-center" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard_admin')}>
          <img src={logo} alt="Logo" className="navbar-logo" />
          <span className="navbar-title">ADMINISTRADOR</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="admin-navbar" />

        <Navbar.Collapse id="admin-navbar">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/clientes')} className="nav-link">Listado de Clientes</Nav.Link>
            <Nav.Link onClick={() => navigate('/abogados')} className="nav-link">Listado de Abogados</Nav.Link>
            <Nav.Link onClick={() => navigate('/casos')} className="nav-link">Listado de Casos</Nav.Link>
            <Nav.Link onClick={() => navigate('/archivos')} className="nav-link">Archivos</Nav.Link>
          </Nav>

          <div className="navbar-user-info">
            <img src={userImg} alt="Usuario" className="navbar-user-photo" />
            <span className="navbar-title">
              {localStorage.getItem("username") || "Admin"}
            </span>
          </div>

          <Button variant="outline-light" className="navbar-logout" onClick={handleLogout}>
            Salir
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarAdmin;
