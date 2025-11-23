import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

// Importamos los 3 Navbar según el rol
import NavbarAdmin from './NavbarAdmin';
import NavbarAbogado from './NavbarAbogado';
import NavbarCliente from './NavbarCliente';

function Home() {
  const rol = localStorage.getItem('rol'); // Recupera el rol del usuario

  // Función que elige qué navbar mostrar
  const renderNavbar = () => {
    switch (rol) {
      case 'ADMIN':
        return <NavbarAdmin />;
      case 'ABOGADO':
        return <NavbarAbogado />;
      case 'CLIENTE':
        return <NavbarCliente />;
      default:
        return null; // Si no hay rol, no muestra ningún navbar
    }
  };

  return (
    <>
      {renderNavbar()} {/* Aquí se muestra el Navbar correcto */}

      <Container className="py-5">
        <h1 className="text-center mb-4 text-primary">
          Defendemos tus derechos con integridad y compromiso
        </h1>

        <Row className="g-4">
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>MISIÓN</Card.Title>
                <Card.Text>
                  En SEJUP - Servicios Jurídicos Profesionales, nuestra misión es ofrecer soluciones jurídicas integrales y efectivas, brindando a nuestros clientes un acompañamiento personalizado y estratégico en cada uno de sus desafíos legales.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>VISIÓN</Card.Title>
                <Card.Text>
                  Ser una firma líder en el ámbito legal colombiano, reconocida por nuestra excelencia, compromiso y capacidad para ofrecer soluciones jurídicas de vanguardia.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <h3 className="mt-5 text-center text-secondary">VALORES</h3>
        <ul className="list-group list-group-flush w-75 mx-auto mt-3">
          <li className="list-group-item">Ética: Honestidad, transparencia y respeto.</li>
          <li className="list-group-item">Compromiso: Atención al detalle y dedicación total.</li>
          <li className="list-group-item">Innovación: Uso de tecnología y enfoques modernos.</li>
          <li className="list-group-item">Confianza: Relaciones a largo plazo y protección de intereses.</li>
          <li className="list-group-item">Responsabilidad social: Acceso a la justicia y equidad.</li>
        </ul>
      </Container>
    </>
  );
}

export default Home;
