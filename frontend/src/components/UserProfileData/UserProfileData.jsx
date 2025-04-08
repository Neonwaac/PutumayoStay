import React from "react";
import "./UserProfileData.css";

function UserProfileData({id, nombre, apellido, correo, telefono, edad, timestamp}) {
    return (
        <section className="user-profile-data">
            <h1>{nombre}</h1>
            <h1>{apellido}</h1>
            <h1>{correo}</h1>
            <h1>{telefono}</h1>
            <h1>{edad}</h1>
        </section>
    );
}

export default UserProfileData;