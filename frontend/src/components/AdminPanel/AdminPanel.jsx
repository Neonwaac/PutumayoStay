import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AdminPanel.css';

const AdminPanel = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://localhost:8077/usuarios', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsuarios(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            setLoading(false);
        }
    };

    const handleRoleChange = async (id, newRole) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`https://localhost:8077/usuarios/${id}/rol`, { rol: newRole }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('Éxito', 'Rol actualizado correctamente', 'success');
            fetchUsuarios();
        } catch (error) {
            Swal.fire('Error', 'No se pudo actualizar el rol', 'error');
        }
    };

    const handleDeleteUser = async (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token');
                    await axios.delete(`https://localhost:8077/usuarios/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
                    fetchUsuarios();
                } catch (error) {
                    Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
                }
            }
        });
    };

    if (loading) return <p>Cargando usuarios...</p>;

    return (
        <div className="admin-panel-container">
            <h2 className="admin-panel-title">Panel de Administración</h2>
            <table className="admin-panel-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.username}</td>
                            <td>{usuario.correo}</td>
                            <td>
                                <select
                                    className="admin-panel-select"
                                    value={usuario.rol}
                                    onChange={(e) => handleRoleChange(usuario.id, e.target.value)}
                                >
                                    <option value="1">Usuario</option>
                                    <option value="2">Administrador</option>
                                    <option value="3">Empresa</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    className="admin-panel-delete-btn"
                                    onClick={() => handleDeleteUser(usuario.id)}
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
};

export default AdminPanel;
