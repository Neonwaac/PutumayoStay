import axios from "axios";
import React from "react";
const apiKey = process.env.REACT_APP_PUTUMAYOSTAY_API_KEY
function Prueba() {
    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:8077/usuarios/', {headers: {"x-api-key": apiKey}});
            console.log(response.data);
        } catch (error) {
            
        }
    }
    fetchData();
    return (
        alert(apiKey)
    );
}
export default Prueba;