import React, { useState } from "react";
import "./AddRoomModal.css";
import PreviewPhoto from "../../assets/default-preview-photo.png"
import axios from "axios";
import Swal from "sweetalert2";
const AddRoomModal = ({ isOpen, onClose, id_empresa }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    capacidad: "",
    precio: "",
    categoria: "1",
    foto: null,
    id_empresa: id_empresa
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const [previewImage, setPreviewImage] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, foto: file });
      setPreviewImage(URL.createObjectURL(file));
    }
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
    data.append("id_empresa", id_empresa)

    try {
      const response = await axios.post("http://localhost:8077/rooms", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        title: "Habitación publicada correctamente",
        icon: "success",
        draggable: true
    });
    window.location.reload(true);
      onClose();
    } catch (error) {
      console.error("Error al agregar la habitación", error);
       Swal.fire({
        icon: "error",
        title: "Error al publicar la habitación",
        text: error.response.data.error,
    });
    }
  };
  return (
    isOpen && (
      <div className="add-room-modal" onClick={onClose}>
        <div
          className="add-room-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="add-room-modal-title">Agregar Habitación</h2>
          <form className="add-room-modal-form" onSubmit={handleSubmit}>
            <div className="add-room-modal-left">
                <img src={previewImage ? previewImage : PreviewPhoto}className="add-room-modal-preview-image"/>
              <input
                id="file-upload"
                className="add-room-modal-input-image"
                required
                type="file"
                name="foto"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload"
                className="add-room-modal-label-image"
              >
                Seleccionar Imagen
              </label>
            </div>
            <div className="add-room-modal-right">
              <label className="add-room-modal-label">
                Nombre de la habitación:
              </label>
              <input
                className="add-room-modal-input"
                type="text"
                name="nombre"
                placeholder="Dale un nombre a la habitación"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              <div className="add-room-modal-item-container">
              <label className="add-room-modal-label">Capacidad:</label>
              <input
                className="add-room-modal-input"
                type="number"
                name="capacidad"
                placeholder="#personas"
                value={formData.capacidad}
                onChange={handleChange}
                required
              />
              </div>
              <div className="add-room-modal-item-container">
              <label className="add-room-modal-label">Precio x noche:</label>
              <input
                className="add-room-modal-input"
                type="text"
                name="precio"
                placeholder="Ej. 100.000COP"
                value={formData.precio}
                onChange={handleChange}
                required
              />
              </div>
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
              <label className="add-room-modal-label">Descripción:</label>
              <textarea
                className="add-room-modal-text-area"
                name="descripcion"
                placeholder="Escribe una descripción"
                value={formData.descripcion}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button className="add-room-modal-button" type="submit">
              Agregar
            </button>

            <button
              className="add-room-modal-button-close"
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
};

export default AddRoomModal;
