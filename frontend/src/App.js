import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import RoomsPage from './pages/RoomsPage/RoomsPage';
import ReviewsPage from './pages/ReviewsPage/ReviewsPage';
import AboutPage from './pages/AboutPage/AboutPage';
import SpecificRoomPage from './pages/SpecificRoomPage/SpecificRoomPage';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<HomePage />} />
      <Route path="/rooms" element={<RoomsPage />} />
      <Route path="/specificroom/:id" element={<SpecificRoomPage/>} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
