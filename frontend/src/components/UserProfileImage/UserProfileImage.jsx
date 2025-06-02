import React from "react";
import "./UserProfileImage.css";
import { FaEdit } from "react-icons/fa";

function UserProfileImage({ id, foto, username }) {
  const changePhoto = () => {
    console.log("Editar foto");
  };

  const changeUsername = () => {
    console.log("Editar nombre");
  };

  return (
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
  );
}

export default UserProfileImage;
