import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

export default function ContactoModal({ show, handleClose }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [alerta, setAlerta] = useState("");

  const handleEnviar = (e) => {
    e.preventDefault();

    if (!nombre || !email || !mensaje) {
      setAlerta("Por favor completa todos los campos.");
      return;
    }

    console.log("Mensaje enviado:", { nombre, email, mensaje });

    setAlerta("Mensaje enviado correctamente ✔️");

    // limpiar
    setNombre("");
    setEmail("");
    setMensaje("");

    setTimeout(() => {
      setAlerta("");
      handleClose();
    }, 1200);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Contacto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {alerta && <Alert variant="info">{alerta}</Alert>}

        <Form onSubmit={handleEnviar}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="correo@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Escribe tu mensaje..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Enviar Mensaje
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
