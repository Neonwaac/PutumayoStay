import React from "react";
import "./UserProfilePassword.css";

function UserProfilePassword({id, password}) {
    return (
        <div className="user-profile-password">
            <h1>{password}</h1>
        </div>
    );
}

export default UserProfilePassword;