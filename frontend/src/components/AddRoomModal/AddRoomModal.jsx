import React, { useState } from "react";
import "./AddRoomModal.css";
import { MdDisabledByDefault } from "react-icons/md";
import axios from "axios";

const AddRoomModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    capacidad: "",
    precio: "",
    categoria: "1",
    foto: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, foto: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("nombre", formData.nombre);
    data.append("descripcion", formData.descripcion);
    data.append("capacidad", formData.capacidad);
    data.append("precio", formData.precio);
    data.append("categoria", formData.categoria);
    data.append("foto", formData.foto);

    try {
      const response = await axios.post("http://localhost:8077/rooms", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Habitación agregada con éxito");
      onClose();
    } catch (error) {
      console.error("Error al agregar la habitación", error);
      alert("Hubo un error al agregar la habitación");
    }
  };

  return (
    isOpen && (
      <div className="add-room-modal" onClick={onClose}>
        <div className="add-room-modal-content" onClick={(e) => e.stopPropagation()}>
          <h2 className="add-room-modal-title">Agregar Habitación</h2>
          <form className="add-room-modal-form" onSubmit={handleSubmit}>
            <input
              id="file-upload"
              className="add-room-modal-input-image"
              required
              type="file"
              name="foto"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload" className="add-room-modal-label-image">
              Seleccionar Imagen
            </label>

            <label className="add-room-modal-label">Nombre de la habitación:</label>
            <input
              className="add-room-modal-input"
              type="text"
              name="nombre"
              placeholder="Dale un nombre a la habitación"
              value={formData.nombre}
              onChange={handleChange}
              required
            />

            <label className="add-room-modal-label">Descripción:</label>
            <textarea
              className="add-room-modal-text-area"
              name="descripcion"
              placeholder="Escribe una descripción"
              value={formData.descripcion}
              onChange={handleChange}
              required
            ></textarea>

            <label className="add-room-modal-label">Capacidad:</label>
            <input
              className="add-room-modal-input"
              type="number"
              name="capacidad"
              placeholder="Número de personas máximo Ej. 5"
              value={formData.capacidad}
              onChange={handleChange}
              required
            />

            <label className="add-room-modal-label">Precio por noche:</label>
            <input
              className="add-room-modal-input"
              type="number"
              name="precio"
              placeholder="Precio por noche Ej. 150.000COP"
              value={formData.precio}
              onChange={handleChange}
              required
            />

            <label className="add-room-modal-label">Categoría:</label>
            <select
              className="add-room-modal-select"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            >
              <option value={1}>Estándar</option>
              <option value={2}>Doble</option>
              <option value={3}>Suite</option>
              <option value={4}>Suite Jr</option>
              <option value={5}>Familiar</option>
              <option value={6}>Penthouse</option>
            </select>

            <button className="add-room-modal-button" type="submit">
              Agregar
            </button>

            <button className="add-room-modal-close-button" type="button" onClick={onClose}>
              <MdDisabledByDefault className="add-room-modal-icon" />
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default AddRoomModal;