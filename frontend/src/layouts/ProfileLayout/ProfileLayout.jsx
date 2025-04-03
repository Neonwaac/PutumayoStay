import React, { useEffect, useState } from "react";
import "./ProfileLayout.css";
import UserProfileData from "../../components/UserProfileData/UserProfileData";
import UserProfileImage from "../../components/UserProfileImage/UserProfileImage";
import UserProfilePassword from "../../components/UserProfilePassword/UserProfilePassword";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
                const response = await axios.get(`http://localhost:8077/usuarios/token/${token}`);
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
        />}
        {user && <UserProfileData
        id={user.id}
        username={user.username}
        nombre={user.nombre}
        apellido={user.apellido}
        correo={user.correo}
        telefono={user.telefono}
        fecha_nacimiento={user.edad}
        fecha_registro={user.timestamp}
        />}
        {user && <UserProfilePassword 
        id={user.id}
        password={user.password}
        />}
    </section>
  );
}

export default ProfileLayout;
