import React, { useState } from "react";
import "./EditUserPhotoModal.css";
import PreviewPhoto from "../../assets/default-preview-photo.png";
import axios from "axios";
import Swal from "sweetalert2";

const EditUserPhotoModal = ({ isOpen, onClose, userId, currentPhoto, username }) => {
  const [formData, setFormData] = useState({
    foto: null,
    id_usuario: userId
  });

  const [previewImage, setPreviewImage] = useState(currentPhoto || null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, foto: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!formData.foto) {
      Swal.fire({
        icon: "warning",
        title: "Selecciona una imagen",
        text: "Debes seleccionar una nueva imagen para continuar",
      });
      return;
    }

    const data = new FormData();
    data.append("foto", formData.foto);
    data.append("username", username);
    try {
      const response = await axios.put(`https://localhost:8077/usuarios/${userId}/photo`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      Swal.fire({
        title: "Foto actualizada correctamente",
        icon: "success",
        draggable: true
      });
      
      window.location.reload(true);
      onClose();
    } catch (error) {
      console.error("Error al actualizar la foto", error);
      Swal.fire({
        icon: "error",
        title: "Error al actualizar la foto",
        text: error.response?.data?.error || "Ha ocurrido un error inesperado",
      });
    }
  };

  return (
    isOpen && (
      <div className="edit-user-photo-modal" onClick={onClose}>
        <div
          className="edit-user-photo-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="edit-user-photo-modal-title">Cambiar Foto de Perfil</h2>
          <form className="edit-user-photo-modal-form" onSubmit={handleSubmit}>
            <div className="edit-user-photo-modal-image-container">
              <img 
                src={previewImage || PreviewPhoto} 
                alt="Vista previa" 
                className="edit-user-photo-modal-preview-image"
              />
              <input
                id="file-upload-user"
                className="edit-user-photo-modal-input-image"
                type="file"
                name="foto"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload-user"
                className="edit-user-photo-modal-label-image"
              >
                Seleccionar Nueva Imagen
              </label>
            </div>

            <div className="edit-user-photo-modal-buttons">
              <button className="edit-user-photo-modal-button" type="submit">
                Actualizar
              </button>
              <button
                className="edit-user-photo-modal-button-close"
                type="button"
                onClick={onClose}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditUserPhotoModal;