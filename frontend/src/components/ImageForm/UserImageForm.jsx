import React from "react";
import "./UserImageForm.css"
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
function UserImageForm() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!selectedFile){
            alert("Seleccione un archivo");
            return;
        }
        const formData = new FormData();
        formData.append("image", selectedFile);
        try{
            const response = await axios.post("http://localhost:8077/images", formData);
            if(response.status === 200){
            alert("Imagen subida correctamente");
            navigate("/dashboard");
            }else{
                alert("Error al subir la imagen");
            }
        }catch (error){
            console.error("Error al subir la imagen", error);
            alert("Error al subir la imagen (catch)");
        }
    }
    return(
        <section className="user-image-form">
            <h1 className="user-image-title">Subir Imagen</h1>
            <form className="user-image-form-form" onSubmit={handleSubmit}>
            <input id="file-upload" className="user-image-form-input" required type="file" name="image" onChange={handleFileChange}/>
                <label for="file-upload" className="user-image-form-label">Seleccionar</label>
                <button className="user-image-form-button" type="submit" value="enviar">Confirmar</button>
            </form>
        </section>
    )
}

export default UserImageForm;