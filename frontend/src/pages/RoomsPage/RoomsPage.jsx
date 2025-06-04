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
const apiKey = process.env.REACT_APP_PUTUMAYOSTAY_API_KEY;
function RoomsPage() {
  const [user, setUser] = useState("");
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const changeCategory = (id) => {
    if(category === id){
      setCategory(null);
      return;
    }
    setSearch("");
    setCategory(id);
  }
  const changeSearch = (text) => {
    if (search === text) {
      setSearch("");
      return;
    }
    setCategory(null);
    setSearch(text);
  };
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
          `https://localhost:8077/usuarios/token/${token}`, {headers: {"x-api-key": apiKey}}
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                changeSearch(e.target.value);
              }
            }}
          ></input>
          <button className="rooms-page-filter-search-button" onClick={(e) => {
            const input = document.querySelector(".rooms-page-filter-search-input");
    changeSearch(input.value);}}>
            <FaSearch />
          </button>
        </div>
        <div className="rooms-page-filter-category">
          <p className="rooms-page-filter-category-title">
            ¿Que tipo de habitación buscas?
          </p>
          <button className="rooms-page-filter-category-option" onClick={(e) => changeCategory(1)}>Estándar</button>
          <button className="rooms-page-filter-category-option" onClick={(e) => changeCategory(2)}>Doble</button>
          <button className="rooms-page-filter-category-option" onClick={(e) => changeCategory(3)}>Suite</button>
          <button className="rooms-page-filter-category-option" onClick={(e) => changeCategory(4)}>
            Suite Jr
          </button>
          <button className="rooms-page-filter-category-option" onClick={(e) => changeCategory(5)}>
            Familiar
          </button>
          <button className="rooms-page-filter-category-option" onClick={(e) => changeCategory(6)}>
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
      <RoomsLayout 
      key={category || search}
      maxRoomCards={maxRoomCards}
      category={category}
      search={search}
      />
      <BestRecomendations/>
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
