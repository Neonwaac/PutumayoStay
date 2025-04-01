import React, { useEffect, useState } from "react";
import "./ProfileLayout.css";
import UserProfileData from "../../components/UserProfileData/UserProfileData";
import UserProfileImage from "../../components/UserProfileImage/UserProfileImage";
import UserProfilePassword from "../../components/UserProfilePassword/UserProfilePassword";
import { useNavigate } from "react-router-dom";

function ProfileLayout() {
    const [user, setUser] = useState();
    const navigate = useNavigate();
      useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser);
        } else {
          navigate("/login");
        }
      }, [navigate]);
  return (
    <section className="profile-layout">
        {user && <UserProfileData id={user.id}/>}
        {user &&<UserProfileImage />}
        {user && <UserProfilePassword />}
    </section>
  );
}

export default ProfileLayout;
