import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Alert, Spinner } from "react-bootstrap";

function ArchivosList() {
    const [archivos, setArchivos] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArchivos = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No hay token. Inicia sesión primero.");
                    setLoading(false);
                    return;
                }

                const res = await axios.get("http://localhost:8080/api/SEJUP/files", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setArchivos(res.data);
            } catch (err) {
                setError("No se pudieron cargar los archivos (verifica tu sesión o el backend).");
            } finally {
                setLoading(false);
            }
        };

        fetchArchivos();
    }, []);

    return (
        <Container className="mt-4">
            <h3 className="mb-4">📂 Lista de Archivos Subidos</h3>

            {loading && (
                <div className="text-center">
                    <Spinner animation="border" />
                    <p>Cargando archivos...</p>
                </div>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && archivos.length > 0 && (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Tamaño (bytes)</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {archivos.map((archivo, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{archivo.nombreArchivo}</td>
                                <td>{archivo.tipoArchivo}</td>
                                <td>{archivo.size}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        href={archivo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Descargar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {!loading && archivos.length === 0 && !error && (
                <Alert variant="info">No hay archivos disponibles.</Alert>
            )}
        </Container>
    );
}

export default ArchivosList;
