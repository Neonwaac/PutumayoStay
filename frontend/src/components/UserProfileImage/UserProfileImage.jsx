import React from "react";
import "./UserProfileImage.css";
import { FaEdit } from "react-icons/fa";
function UserProfileImage({id, foto, username}){
    return(
        <section className="user-profile-image">
            <img src={foto} alt="User Profile Image" className="user-profile-image-image" />
            <h1 className="user-profile-image-username">{username} <FaEdit></FaEdit></h1>
        </section>
    )
}

export default UserProfileImage;
