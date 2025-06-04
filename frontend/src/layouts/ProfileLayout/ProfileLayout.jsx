import React, { useEffect, useState } from "react";
import "./ProfileLayout.css";
import UserProfileData from "../../components/UserProfileData/UserProfileData";
import UserProfileImage from "../../components/UserProfileImage/UserProfileImage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const apiKey = process.env.REACT_APP_PUTUMAYOSTAY_API_KEY


function ProfileLayout() {
  const navigate = useNavigate();
    const [user, setUser] = useState();
    const [token, setToken] = useState(null);
    
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        } else {
            navigate("/login");
        }
    }, [navigate]);
    
    useEffect(() => {
        const fetchUserByToken = async () => {
            if (!token) return;
    
            try {
                const response = await axios.get(`https://localhost:8077/usuarios/token/${token}`, {headers: {"x-api-key": apiKey}});
                setUser(response.data);
            } catch (error) {
                console.error("Error al obtener el usuario por token:", error);
                navigate("/login"); 
            }
        };
    
        fetchUserByToken();
    }, [token, navigate]);
  return (
    <section className="profile-layout">
        {user &&<UserProfileImage  
        id={user.id}
        foto={user.foto}
        username={user.username}
        />}
        {user && <UserProfileData
        id={user.id}
        nombres={user.nombres}
        apellidos={user.apellidos}
        correo={user.correo}
        telefono={user.telefono}
        edad={user.edad}
        timestamp={user.timestamp}
        />}
    </section>
  );
}

export default ProfileLayout;
