import React, { useState } from "react";
import { Modal, Button, Form, Card, Container, Alert } from "react-bootstrap";
import axios from "axios";

export default function Register({ show, onClose }) {

  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const newUser = {
        username,
        password
      };

      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, newUser);

      setSuccess("Registrado correctamente");

      setTimeout(() => {
        onClose(); // cerrar modal
      }, 1200);

    } catch (err) {
      setError(err.response?.data || "Error en el registro");
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Body>

        <Container className="d-flex justify-content-center align-items-center">
          <Card className="p-4 shadow-lg" style={{ width: "25rem" }}>
            <Card.Body>
              <h3 className="text-center mb-4">Registrarse</h3>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleRegister}>

                <Form.Group className="mb-3">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="w-100">
                  Registrarme
                </Button>

              </Form>
            </Card.Body>
          </Card>
        </Container>

      </Modal.Body>
    </Modal>
  );
}
