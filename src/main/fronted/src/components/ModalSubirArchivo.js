import React, { useState } from 'react';
import { Modal, Button, Form, Alert, ProgressBar } from 'react-bootstrap';

export default function ModalSubirArchivo({ show, handleClose }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
        setSuccess('');
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Por favor selecciona un archivo.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/SEJUP/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                setSuccess('Archivo subido exitosamente.');
                setFile(null);
                // Opcional: cerrar el modal automáticamente después de un tiempo
                setTimeout(() => {
                    handleClose();
                    setSuccess('');
                }, 1500);
            } else {
                const errorData = await response.json().catch(() => ({}));
                setError(errorData.message || 'Error al subir el archivo.');
            }
        } catch (err) {
            console.error(err);
            setError('Error de conexión con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Subir Archivo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Selecciona un archivo</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>

                {loading && <ProgressBar animated now={100} label="Subiendo..." className="mb-3" />}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={loading}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleUpload} disabled={loading || !file}>
                    {loading ? 'Subiendo...' : 'Subir'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
