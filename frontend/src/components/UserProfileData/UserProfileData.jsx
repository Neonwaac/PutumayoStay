import React from "react";
import "./UserProfileData.css";

function UserProfileData({
  id,
  nombre,
  apellido,
  correo,
  telefono,
  edad,
  timestamp,
}) {
  return (
    console.log(id, nombre, apellido, correo, telefono, edad, timestamp),
    (
      <section className="user-profile-data">
        <h1 className="user-profile-data-title">Tu información:</h1>
        <h1 className="user-profile-data-id">Tu id de usuario: {id}</h1>
        <div className="user-profile-data-cl">
          <h1 className="user-profile-data-card-title">Nombres:</h1>
          <div className="user-profile-data-card-container">
            <h1 className="user-profile-data-card">{nombre}</h1>
          </div>
          <h1 className="user-profile-data-card-title">Apellidos:</h1>
          <div className="user-profile-data-card-container">
            <h1 className="user-profile-data-card">{apellido}</h1>
          </div>
          <h1 className="user-profile-data-card-title">Correo:</h1>
          <div className="user-profile-data-card-container">
            <h1 className="user-profile-data-card">{correo}</h1>
          </div>
        </div>
        <div className="user-profile-data-cl">
          <h1 className="user-profile-data-card-title">Telefono:</h1>
          <div className="user-profile-data-card-container">
            <h1 className="user-profile-data-card">{telefono}</h1>
          </div>
          <h1 className="user-profile-data-card-title">Fecha de nacimiento:</h1>
          <div className="user-profile-data-card-container">
            <h1 className="user-profile-data-card">{edad}</h1>
          </div>
          <h1 className="user-profile-data-card-title">Opciones:</h1>
          <div className="user-profile-data-buttons-container">
            <button className="user-profile-data-button-edit user-profile-data-button">Editar</button>
            <button className="user-profile-data-button-save user-profile-data-button">Guardar</button>
            <button className="user-profile-data-button-change-password user-profile-data-button">Cambiar Contraseña</button>
          </div>
        </div>
      </section>
    )
  );
}

export default UserProfileData;
