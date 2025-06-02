import React, { useState } from "react";
import "./UserProfileImage.css";
import { FaEdit } from "react-icons/fa";
import EditUserPhotoModal from "../EditUserPhotoModal/EditUserPhotoModal";

function UserProfileImage({ id, foto, username }) {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const changePhoto = () => {
    setIsPhotoModalOpen(true);
  };

  const closePhotoModal = () => {
    setIsPhotoModalOpen(false);
  };

  const changeUsername = () => {
    console.log("Editar nombre");
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
          {username}
          <FaEdit
            className="user-profile-image-username-span"
            onClick={changeUsername}
          />
        </h1>
      </section>

      <EditUserPhotoModal
        isOpen={isPhotoModalOpen}
        onClose={closePhotoModal}
        userId={id}
        currentPhoto={foto}
        username={username}
      />
    </>
  );
}

export default UserProfileImage;
