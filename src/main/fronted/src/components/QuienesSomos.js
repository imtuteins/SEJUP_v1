import React from "react";
import { Modal, Card, Row, Col } from "react-bootstrap";

export default function QuienesSomos({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Responsables del proyecto SEJUP</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col md={6}>
            <Card className="p-3 text-center">
              <h4>Kevin Malagon</h4>
              <h5>2205547</h5>
                <ul className="text-muted">
                    <li>Idea original del proyecto</li>
                    <li>Responsable del Backend</li>
                </ul>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="p-3 text-center">
              <h4>Jose Augusto Quintero Lobo</h4>
              <h5>2202348</h5>
                <ul className="text-muted">
                    <li>Respoonsable del FrontEnd</li>
                    <li>Diseño de las vistas de la pagina</li>
                </ul>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}