import React, { useEffect, useState } from "react";
import "./RoomsPage.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import RoomsLayout from "../../layouts/RoomsLayout/RoomsLayout";
import { FaSearch, FaPlus } from "react-icons/fa";
import AppFooter from "../../components/AppFooter/AppFooter";
import { useNavigate } from "react-router-dom";
import AddRoomModal from "../../components/AddRoomModal/AddRoomModal";
import axios from "axios";
import BestRecomendations from "../../layouts/BestRecomendations/BestRecomendations";
function RoomsPage() {
  const [user, setUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  let [maxRoomCards, setMaxRoomCards] = useState(3);
  useEffect(() => {
    const updateMaxRoomCards = () => {
      const width = window.innerWidth;

      if (width >= 1820) {
        setMaxRoomCards(4);
      } else if (width >= 1280) {
        setMaxRoomCards(3);
      } else if (width >= 768) {
        setMaxRoomCards(2);
      } else {
        setMaxRoomCards(2);
      }
    };
    updateMaxRoomCards();
  });
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
        const response = await axios.get(
          `https://localhost:8077/usuarios/token/${token}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener el usuario por token:", error);
        navigate("/login");
      }
    };

    fetchUserByToken();
  }, [token, navigate]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <section className="rooms-page">
      <NavigationBar />
      <h1 className="rooms-page-title">Encuentra tu habitación ideal</h1>
      <div className="rooms-page-filter-container">
        <div className="rooms-page-filter-search">
          <input
            className="rooms-page-filter-search-input"
            type="text"
            placeholder="Busca por nombre de habitación"
          ></input>
          <button className="rooms-page-filter-search-button">
            <FaSearch />
          </button>
        </div>
        <div className="rooms-page-filter-category">
          <p className="rooms-page-filter-category-title">
            ¿Que tipo de habitación buscas?
          </p>
          <button className="rooms-page-filter-category-option">
            Estándar
          </button>
          <button className="rooms-page-filter-category-option">Doble</button>
          <button className="rooms-page-filter-category-option">Suite</button>
          <button className="rooms-page-filter-category-option">
            Suite Jr
          </button>
          <button className="rooms-page-filter-category-option">
            Familiar
          </button>
          <button className="rooms-page-filter-category-option">
            Penthouse
          </button>
        </div>
      </div>
      <div className="rooms-page-add">
        {user && (Number(user.rol) === 2 || Number(user.rol) === 3) && (
          <h3 className="rooms-page-add-title">🛠️ Agrega una habitación</h3>
        )}
        {user && (Number(user.rol) === 2 || Number(user.rol) === 3) && (
          <button className="rooms-page-add-button" onClick={openModal}>
            <FaPlus />
          </button>
        )}
      </div>
      <BestRecomendations/>
      <RoomsLayout maxRoomCards={maxRoomCards}/>
      
      <AppFooter />
      <AddRoomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        id_empresa={user.id}
      />
    </section>
  );
}

export default RoomsPage;
