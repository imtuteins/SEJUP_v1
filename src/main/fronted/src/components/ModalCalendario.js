import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function ModalCalendario({ show, handleClose }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [fechaServidor, setFechaServidor] = useState(null);

  // Genera matriz de días para el mes actual
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Primer día del mes
    const firstDay = new Date(year, month, 1);
    // Último día del mes
    const lastDay = new Date(year, month + 1, 0);

    // Día de la semana del primer día (0=domingo,...)
    const startDay = firstDay.getDay();
    // Adaptar para lunes = 0
    const adjustedStartDay = (startDay + 6) % 7;

    const totalDays = lastDay.getDate();

    // Array con días para mostrar, incluyendo espacios vacíos al inicio
    const daysArray = [];

    // Casillas vacías para alinear el primer día
    for (let i = 0; i < adjustedStartDay; i++) {
      daysArray.push(null);
    }
    // Días del mes
    for (let day = 1; day <= totalDays; day++) {
      daysArray.push(day);
    }

    // Completar con null para llenar la cuadrícula 7x6
    while (daysArray.length % 7 !== 0) {
      daysArray.push(null);
    }

    return daysArray;
  };

  const days = generateCalendarDays();

  // Formatear mes y año para el título
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const title = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  // Día actual para resaltar
  const today = new Date();
  const isToday = (day) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  //HORA REAL DEL BACKEND 
  useEffect(() => {
    const fetchFechaServidor = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8080/servidor/fecha`);

        const data = await res.json();
        setFechaServidor(data); // { fecha: "...", hora: "..." }

      } catch (err) {
        console.error("Error al obtener fecha del servidor", err);
      } finally {
        setLoading(false);
      }
    };

    if (show) fetchFechaServidor();

  }, [show]);


  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Agenda - {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex", gap: "10px" }}>
          {/* Calendario */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", fontWeight: "bold", marginBottom: 5 }}>
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((d) => (
                <div key={d} style={{ borderBottom: "2px solid #ccc", paddingBottom: 5 }}>{d}</div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
              {days.map((day, idx) => (
                <div
                  key={idx}
                  style={{
                    minHeight: 80,
                    border: "1px solid #007bff",
                    borderRadius: 4,
                    padding: 5,
                    backgroundColor: day && isToday(day) ? "#cce5ff" : "white",
                    color: day ? "black" : "#ddd",
                    cursor: day ? "default" : "unset",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  {day && (
                    <>
                      <div style={{ fontWeight: "bold" }}>{day}</div>
                      {/* Aquí puedes agregar emojis o texto ejemplo */}
                      {/* Por ejemplo: */}
                      {/* <small>🔴 Caso cerrado</small> */}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Memo / Notas */}
          <div style={{ width: 150, borderLeft: "2px solid #007bff", paddingLeft: 10 }}>
            <h5 style={{ textAlign: "center" }}>Memo</h5>
            <ul style={{ paddingLeft: 15 }}>
              <li>🔴 Caso cerrado</li>
              <li>🟡 En progreso</li>
              <li>🟢 Nuevo caso</li>
              <li>🔵 Revisión pendiente</li>
              <li>⚠️ Atención urgente</li>
            </ul>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCalendario;