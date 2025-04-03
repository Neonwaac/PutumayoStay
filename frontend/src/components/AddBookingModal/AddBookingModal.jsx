import React, { useEffect, useState } from "react";
import './AddBookingModal.css';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddBookingModal({ isOpen, onClose, id_habitacion, precio }) {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        monto: "",
        fecha_ingreso: "",
        fecha_salida: "",
        id_usuario: null,
        id_habitacion: id_habitacion
    });
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        } else {
            navigate("/login");
        }
    }, [navigate]);
    
    useEffect(() => {
        const fetchUserByToken = async () => {
            if (!token) return;
            try {
                const response = await axios.get(`http://localhost:8077/usuarios/token/${token}`);
                setUser(response.data);
                setFormData(prevState => ({ ...prevState, id_usuario: response.data.id }));
            } catch (error) {
                console.error("Error al obtener el usuario por token:", error);
                navigate("/login"); 
            }
        };
    
        fetchUserByToken();
    }, [token, navigate]);
    const calculateAmount = (fechaIngreso, fechaSalida) => {
        if (!fechaIngreso || !fechaSalida) return "";
        const fecha1 = new Date(fechaIngreso);
        const fecha2 = new Date(fechaSalida);
        const diferenciaDias = Math.ceil((fecha2 - fecha1) / (1000 * 60 * 60 * 24));
        return diferenciaDias > 0 ? "$ " + (diferenciaDias * Number(precio.split("COP")[0].replace(".", ""))).toLocaleString("es-CO") + "COP" : "Nada";

    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedFormData = ({ ...formData, [name]: value });
        if(name == "fecha_ingreso" || name == "fecha_salida"){
            updatedFormData.monto = calculateAmount(updatedFormData.fecha_ingreso, updatedFormData.fecha_salida)
        }
        setFormData(updatedFormData)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8077/reservas", formData);
            Swal.fire({
                title: "Reserva realizada correctamente",
                icon: "success",
                draggable: true
            });
            window.location.reload(true);
            onClose();
        } catch (error) {
            console.error("Error al realizar la reserva", error);
            Swal.fire({
                icon: "error",
                title: "Error al realizar la reserva",
                text: "Verifica el servidor o la BD",
            });
        }
    };

    return (
        isOpen && (
            <div className="add-booking-modal" onClick={onClose}>
                <div
                    className="add-booking-modal-content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="add-booking-modal-title">Realizar Reserva</h2>
                    <form className="add-booking-modal-form" onSubmit={handleSubmit}>
                        <div className="add-booking-modal-left">
                            <label className="add-booking-modal-label">
                                Monto total a pagar:
                            </label>
                            <input
                                className="add-booking-modal-input"
                                type="text"
                                name="monto"
                                placeholder="Monto calculado por la cantidad de noches"
                                value={formData.monto}
                                onChange={handleChange}
                                required
                                readOnly
                            />
                            <label className="add-booking-modal-label">
                                Fecha de Ingreso:
                            </label>
                            <input
                                className="add-booking-modal-input"
                                type="date"
                                name="fecha_ingreso"
                                value={formData.fecha_ingreso}
                                onChange={handleChange}
                                required
                            />
                            <label className="add-booking-modal-label">
                                Fecha de Salida:
                            </label>
                            <input
                                className="add-booking-modal-input"
                                type="date"
                                name="fecha_salida"
                                value={formData.fecha_salida}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button className="add-booking-modal-button" type="submit">
                            Reservar
                        </button>
                        <button
                            className="add-booking-modal-button-close"
                            type="button"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                    </form>
                </div>
            </div>
        )
    );
}

export default AddBookingModal;