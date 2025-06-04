import React, { useState } from "react";
import "./UserProfileData.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const apiKey = process.env.REACT_APP_PUTUMAYOSTAY_API_KEY

function UserProfileData({
  id,
  nombres,
  apellidos,
  correo,
  telefono,
  edad,
  timestamp,
}) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const formattedDate = edad ? edad.split("T")[0] : "";
  const [formData, setFormData] = useState({
    nombres,
    apellidos,
    correo,
    telefono,
    edad,
  });

  const originalData = {
    nombres,
    apellidos,
    correo,
    telefono,
    edad,
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      setFormData(originalData);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const saveChanges = async () => {
    if (!isEditing) return;
    try {
      Swal.fire({
          title: "Estas seguro de guardar estos cambios?",
          text: "Cambios: "+JSON.stringify(originalData) + " ➔ " + JSON.stringify(formData),
          icon: "question",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirmar",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Bien hecho!",
              text: "Tus datos han sido actualizados.",
              icon: "success",
            });
            try {
              axios.put(`https://localhost:8077/usuarios/${id}/data`, {headers: {"x-api-key": apiKey}}, formData);
              setIsEditing(false);
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: "Error al guardar los cambios",
                text: "Verifica el servidor o la BD",
              });
            }
          }
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar los cambios",
        text: "Intentalo de nuevo",
      });
    }
  };

  return (
    <section className="user-profile-data">
      <h1 className="user-profile-data-title">Tu información:</h1>
      <h1 className="user-profile-data-id">Tu id de usuario: {id}</h1>

      <div className="user-profile-data-cl">
        <h1 className="user-profile-data-card-title">Nombres:</h1>
        <div className="user-profile-data-card-container">
          <input
            type="text"
            className="user-profile-data-input"
            value={formData.nombres}
            onChange={(e) => handleChange("nombres", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <h1 className="user-profile-data-card-title">Apellidos:</h1>
        <div className="user-profile-data-card-container">
          <input
            type="text"
            className="user-profile-data-input"
            value={formData.apellidos}
            onChange={(e) => handleChange("apellidos", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <h1 className="user-profile-data-card-title">Correo:</h1>
        <div className="user-profile-data-card-container">
          <input
            type="email"
            className="user-profile-data-input"
            value={formData.correo}
            onChange={(e) => handleChange("correo", e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="user-profile-data-cl">
        <h1 className="user-profile-data-card-title">Teléfono:</h1>
        <div className="user-profile-data-card-container">
          <input
            type="text"
            className="user-profile-data-input"
            value={formData.telefono}
            onChange={(e) => handleChange("telefono", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <h1 className="user-profile-data-card-title">Fecha de nacimiento:</h1>
        <div className="user-profile-data-card-container">
          <input
            type="date"
            className="user-profile-data-input"
            value={formattedDate?formattedDate:null}
            onChange={(e) => handleChange("edad", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <h1 className="user-profile-data-card-title">Opciones:</h1>
        <div className="user-profile-data-buttons-container">
          <button
            className={`user-profile-data-button-edit user-profile-data-button ${
              isEditing ? "user-profile-data-button-change-password" : ""
            }`}
            onClick={toggleEdit}
          >
            {isEditing ? "Cancelar" : "Editar"}
          </button>

          <button
            className="user-profile-data-button-save user-profile-data-button"
            onClick={saveChanges}
          >
            Guardar
          </button>

          <button
            className="user-profile-data-button-change-password user-profile-data-button"
            onClick={() => navigate("/changepassword")}
          >
            Cambiar Contraseña
          </button>
        </div>
      </div>
    </section>
  );
}

export default UserProfileData;
