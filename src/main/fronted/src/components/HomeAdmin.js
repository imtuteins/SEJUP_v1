import React, { useEffect, useState } from "react";
import { Accordion, Container, Spinner, Alert, Badge } from "react-bootstrap";
import NavbarAdmin from "./NavbarAdmin";
import "../styles/homeadmin.css"; // Importar estilos

function HomeAdmin() {
  const [stats, setStats] = useState({
    clientes: 0,
    abogados: 0,
    casos: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch Clientes
        const resClientes = await fetch(`${process.env.REACT_APP_API_URL}/admin/usuarios`, { headers });
        let countClientes = 0;
        if (resClientes.ok) {
          const data = await resClientes.json();
          countClientes = data.filter(u => u.rol?.name === "ROLE_CLIENTE").length;
        }

        // Fetch Abogados
        const resAbogados = await fetch(`${process.env.REACT_APP_API_URL}/admin/abogados`, { headers });
        let countAbogados = 0;
        if (resAbogados.ok) {
          const data = await resAbogados.json();
          countAbogados = data.length;
        }

        // Fetch Casos
        const resCasos = await fetch(`${process.env.REACT_APP_API_URL}/caso/todos`, { headers });
        let countCasos = 0;
        if (resCasos.ok) {
          const data = await resCasos.json();
          countCasos = data.length;
        }

        setStats({ clientes: countClientes, abogados: countAbogados, casos: countCasos });
      } catch (err) {
        setError("Error al cargar estadísticas.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <NavbarAdmin />

      <Container className="mt-4 home-admin-container">
        <h2 className="mb-4 home-admin-title">Panel de Administración</h2>

        {loading && <Spinner animation="border" variant="warning" />}
        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
          <Accordion defaultActiveKey="0" className="acordeon-admin">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Clientes Registrados <Badge className="ms-2 badge-admin">{stats.clientes}</Badge>
              </Accordion.Header>
              <Accordion.Body>
                Aquí puedes ver un resumen de los clientes registrados en la plataforma.
                Utiliza el menú de navegación para ver el listado completo y gestionar sus cuentas.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>
                Abogados Disponibles <Badge className="ms-2 badge-admin">{stats.abogados}</Badge>
              </Accordion.Header>
              <Accordion.Body>
                Resumen del equipo legal. Gestiona sus perfiles y asignaciones desde el menú superior.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>
                Casos Activos <Badge className="ms-2 badge-admin">{stats.casos}</Badge>
              </Accordion.Header>
              <Accordion.Body>
                Total de casos legales registrados en el sistema. Puedes asignar clientes y abogados desde la sección de Casos.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      </Container>
    </>
  );
}

export default HomeAdmin;
