import React, { useState } from 'react';
import { Container, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/footer.css';
import "../styles/homepage.css";

import logo from "../logo_removed.png";
import backgound from "../background_2.jpg";



import Login from "./Login";
import Registro from "./Registro";
import NavbarHomePage from "./NavbarHomePage";
import NavbarAdmin from "./NavbarAdmin";
import NavbarAbogado from "./NavbarAbogado";
import NavbarCliente from "./NavbarCliente";



function HomePage() {
  //Funciones que se envían al navbar homepage
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const handleLogin = () => setShowLogin(true);
  const handleRegister = () => setShowRegister(true);

  //Traer rol actual desde localStorage
  const rol = localStorage.getItem("role");

  // Seleccionar navbar según rol
  const renderNavbar = () => {
    switch (rol) {
      case "ADMIN":
        return <NavbarAdmin />;

      case "ABOGADO":
        return <NavbarAbogado />;

      case "CLIENTE":
        return <NavbarCliente />;

      default:
        return (
          <NavbarHomePage
            onLogin={handleLogin}
            onRegister={handleRegister}
          />
        );
    }
  };

  // Reseñas
  const reviews = [
    { nombre: "Carlos M.", comentario: "Excelente atención y acompañamiento legal. Muy recomendados." },
    { nombre: "María P.", comentario: "Mi caso fue resuelto más rápido de lo esperado. 10/10." },
    { nombre: "Julián R.", comentario: "Profesionales, atentos y muy claros en su explicación." },
    { nombre: "Ana G.", comentario: "Gran equipo, me ayudaron con un proceso complicado." },
  ];

  return (
  <>

    {/* MAIN CONTENT ↓↓↓ */}
    <div className="main-content">
      
      <div
        className="homepage-wrapper"
        style={{ backgroundImage: `url(${backgound})` }}
      >{renderNavbar()}
        <Container className="mt-5">
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <Card className="p-4 shadow-sm homepage-card">
                <h1 className="mb-4 homepage-title">¿Por qué SEJUP?</h1>
                <h4 className="homepage-subtitle">
                  Elegirnos significa contar con un equipo de profesionales
                  comprometidos con tu éxito legal. Brindamos soluciones rápidas,
                  confiables y adaptadas a tus necesidades, porque tu tranquilidad
                  es nuestra prioridad.
                </h4>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="container mt-5">
        <h3 className="mb-3 text-center homepage-reviews-title">
          Reseñas de Nuestros Clientes
        </h3>

        <Swiper
          modules={[Navigation]}
          navigation={true}
          spaceBetween={20}
          slidesPerView={3}
          style={{ padding: "10px 0", width: "80%" }}
        >
          {reviews.map((r, i) => (
            <SwiperSlide key={i}>
              <Card className="shadow-sm homepage-review-card" style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{r.nombre}</Card.Title>
                  <Card.Text className="review-card-text">{r.comentario}</Card.Text>
                </Card.Body>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </div>


    </div>
    {/* END MAIN CONTENT ↑↑↑ */}

    {/* FOOTER */}
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-logo-section">
          <img src={logo} alt="SEJUP" className="footer-logo" />
        </div>

        <div className="footer-about">
          <p>
            Como profesionales estamos comprometidos con brindar asesoría jurídica
            confiable, transparente y eficaz a todos nuestros usuarios. Nuestro objetivo
            es acompañar a cada cliente con claridad, responsabilidad y un profundo
            sentido de justicia.
          </p>
        </div>

        <div className="footer-creators">
          <h5>Creadores</h5>
          <p>Kevin Malagon</p>
          <p>Jose Quintero</p>
        </div>
      </div>
    </footer>
  </>
);
}

export default HomePage;
