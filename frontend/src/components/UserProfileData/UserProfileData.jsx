import React from "react";
import "./UserProfileData.css";

function UserProfileData({id}) {
    return (
        <div className="user-profile-data">
            <h1>{id}</h1>
        </div>
    );
}

export default UserProfileData;