import React, { useEffect, useState } from 'react';

function ListadoAbogados() {
  const [abogados, setAbogados] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAbogados = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:8080/admin/abogados', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError('No autorizado: revisa tu token o permisos.');
          } else {
            setError('No se pudo cargar la lista de abogados');
          }
          return;
        }

        const data = await response.json();
        setAbogados(data);

      } catch (err) {
        setError('Error al conectar con el servidor');
      }
    };

    fetchAbogados();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Listado de Abogados</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {abogados.map(abogado => (
            <tr key={abogado.id}>
              <td>{abogado.id}</td>
              <td>{abogado.username}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>Total de abogados: {abogados.length}</p>
    </div>
  );
}

export default ListadoAbogados;
