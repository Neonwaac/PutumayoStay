import React, { useState } from "react";
import "./UserProfileImage.css";
import { FaEdit, FaSave } from "react-icons/fa";
import EditUserPhotoModal from "../EditUserPhotoModal/EditUserPhotoModal";
import axios from "axios";
import Swal from "sweetalert2";
const apiKey = process.env.REACT_APP_PUTUMAYOSTAY_API_KEY

function UserProfileImage({ id, foto, username }) {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [currentUsername, setCurrentUsername] = useState(username);

  const changePhoto = () => {
    setIsPhotoModalOpen(true);
  };

  const closePhotoModal = () => {
    setIsPhotoModalOpen(false);
  };

  const toggleUsernameEdit = async () => {
    if (isEditingUsername) {
      try {
        Swal.fire({
          title: "Estas seguro de cambiar tu nombre de usuario?",
          text: "Cambio: " + currentUsername + " ➔ " + newUsername,
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
              text: "Tu nombre de usuario ha sido cambiado a "+newUsername+".",
              icon: "success",
            });
            try {
              axios.put(`https://localhost:8077/usuarios/${id}/username`,{headers: {"x-api-key": apiKey}}, {
                username: newUsername,
              });
              setCurrentUsername(newUsername);
              setIsEditingUsername(false);
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: "Error al cambiar tu nombre de usuario",
                text: "Verifica el servidor o la BD",
              });
            }
          }
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al cambiar tu nombre de usuario",
          text: "Intentalo de nuevo",
        });
      }
    } else {
      setIsEditingUsername(true);
    }
  };

  return (
    <>
      <section className="user-profile-image">
        <div className="user-profile-image-wrapper" onClick={changePhoto}>
          <img
            src={foto}
            alt="User Profile Image"
            className="user-profile-image-image"
          />
          <FaEdit className="user-profile-image-edit-icon" />
        </div>

        <h1 className="user-profile-image-username">
          {isEditingUsername ? (
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="user-profile-image-input"
            />
          ) : (
            currentUsername
          )}
          {isEditingUsername ? (
            <FaSave
              className="user-profile-image-username-span"
              onClick={toggleUsernameEdit}
              title="Guardar"
            />
          ) : (
            <FaEdit
              className="user-profile-image-username-span"
              onClick={toggleUsernameEdit}
              title="Editar"
            />
          )}
        </h1>
      </section>

      <EditUserPhotoModal
        isOpen={isPhotoModalOpen}
        onClose={closePhotoModal}
        userId={id}
        currentPhoto={foto}
        username={currentUsername}
      />
    </>
  );
}

export default UserProfileImage;
