import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Button, Form, Table, Container, Card } from "react-bootstrap";
import NavbarCliente from "./NavbarCliente";
import "../styles/homepage.css"; // Reusing homepage styles
import background from "../background_2.jpg"; // Reusing homepage background

function Archivos() {
    const [file, setFile] = useState(null);
    const [archivos, setArchivos] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const fetchArchivos = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/SEJUP/files", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setArchivos(response.data);
        } catch (err) {
            console.error(err);
            setError("No se pudieron cargar los archivos 😢");
        }
    };

    useEffect(() => {
        fetchArchivos();
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!file) {
            setError("Selecciona un archivo antes de subirlo");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:8080/api/SEJUP/upload", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setMessage(response.data.message || "Archivo subido correctamente ✅");
            setFile(null);
            fetchArchivos();
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 401) {
                setError("No autorizado. Vuelve a iniciar sesión 🔒");
            } else {
                setError("Error al subir el archivo ❌");
            }
        }
    };

    return (
        <div className="homepage-wrapper" style={{ backgroundImage: `url(${background})` }}>
            <NavbarCliente />

            <Container className="mt-5">
                <Card className="p-4 shadow-sm homepage-card">
                    <h2 className="mb-4 text-center fw-bold homepage-title">Gestión de Archivos</h2>

                    {message && <Alert variant="success">{message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleUpload} className="mb-4 d-flex gap-2">
                        <Form.Control
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="bg-dark text-light border-secondary"
                        />
                        <Button variant="warning" type="submit">
                            Subir Archivo
                        </Button>
                    </Form>

                    <h4 className="mt-4 homepage-subtitle">Archivos Subidos</h4>
                    <Table striped bordered hover responsive variant="dark">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Tipo</th>
                                <th>Tamaño (KB)</th>
                                <th>Descargar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {archivos.length > 0 ? (
                                archivos.map((archivo) => (
                                    <tr key={archivo.id}>
                                        <td>{archivo.nombreArchivo}</td>
                                        <td>{archivo.tipoArchivo}</td>
                                        <td>{(archivo.tamaño / 1024).toFixed(2)}</td>
                                        <td>
                                            <a
                                                href={`http://localhost:8080/api/SEJUP/Archivo/${archivo.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-success btn-sm"
                                            >
                                                Descargar
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        No hay archivos disponibles
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card>
            </Container>
        </div>
    );
}

export default Archivos;
