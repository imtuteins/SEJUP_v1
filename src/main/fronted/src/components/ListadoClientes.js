import React, { useEffect, useState } from 'react';

function ListadoClientes() {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState('');
  const [roleChange, setRoleChange] = useState({}); // Para manejar cambios de rol antes de guardar

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/admin/usuarios`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setClientes(data);
        } else {
          setError('No se pudo cargar la lista de clientes');
        }
      } catch (err) {
        setError('Error al conectar con el servidor');
      }
    };

    fetchClientes();
  }, []);

  // Cambiar rol
  const handleChangeRole = async (id) => {
    const newRole = roleChange[id];
    if (!newRole) return;
    const confirm = window.confirm(`¿Deseas cambiar el rol a ${newRole}?`);
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:8080/admin/usuarios/${id}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rolName: newRole })
      });

      // Actualizar lista localmente
      setClientes(
        clientes.map(cliente =>
          cliente.id === id ? { ...cliente, rol: { name: newRole } } : cliente
        )
      );
      setRoleChange({ ...roleChange, [id]: '' });
    } catch (err) {
      setError('Error al actualizar rol');
    }
  };

  // Eliminar usuario
  const handleDelete = async (id) => {

    const confirm = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (!confirm) return; // Si cancela, no hace nada

    try {

      const token = localStorage.getItem('token');
      await fetch(`http://localhost:8080/admin/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setClientes(clientes.filter(cliente => cliente.id !== id));
    } catch (err) {
      setError('Error al eliminar usuario');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Listado de Clientes</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.username}</td>
              <td>{cliente.rol.name}</td>
              <td>
                <select
                  value={roleChange[cliente.id] || ''}
                  onChange={e =>
                    setRoleChange({ ...roleChange, [cliente.id]: e.target.value })
                  }
                  style={{ marginRight: '5px' }}
                >
                  <option value="">Cambiar rol</option>
                  <option value="ROLE_ADMIN">ADMIN</option>
                  <option value="ROLE_CLIENTE">CLIENTE</option>
                  <option value="ROLE_ABOGADO">ABOGADO</option>
                </select>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleChangeRole(cliente.id)}
                >
                  Guardar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(cliente.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListadoClientes;
