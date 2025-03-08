import React, { useEffect, useState } from "react";
import "./RoomsPage.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import RoomsLayout from "../../layouts/RoomsLayout/RoomsLayout";
import { FaSearch, FaPlus } from "react-icons/fa";
import AppFooter from "../../components/AppFooter/AppFooter";
import { useNavigate } from "react-router-dom";
import AddRoomModal from "../../components/AddRoomModal/AddRoomModal";
function RoomsPage() {
  const [user, setUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false)
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
      <RoomsLayout />
      <AppFooter />
      <AddRoomModal isOpen={isModalOpen} onClose={closeModal} id_empresa={user.id}/>
    </section>
  );
}

export default RoomsPage;
