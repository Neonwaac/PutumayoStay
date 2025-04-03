import React from "react";
import "./UserProfileData.css";

function UserProfileData({id, username, nombre, apellido, correo, telefono, fecha_nacimiento, fecha_registro}) {
    return (
        <div className="user-profile-data">
            <h1>{id}</h1>
            <h1>{username}</h1>
            <h1>{nombre}</h1>
            <h1>{apellido}</h1>
            <h1>{correo}</h1>
            <h1>{telefono}</h1>
            <h1>{fecha_nacimiento}</h1>
            <h1>{fecha_registro}</h1>
        </div>
    );
}

export default UserProfileData;