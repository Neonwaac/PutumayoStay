import React from "react";
import "./UserProfileImage.css";

function UserProfileImage({id, foto}){
    return(
        <img src={foto} width={500}></img>
    )
}

export default UserProfileImage;
