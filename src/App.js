import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import LoginView from "./pages/Login2";
import Landing from "./Landing";
import AdminPage from "./pages/AdminPage";
import ProfileView from "./pages/ProfileView";
import TokenEmail from "./pages/TokenEmail";
import { useState, useEffect } from "react";
import Protected from './components/Protected';
import NavbarAdmin from "./components/NavbarAdmin";
import Videogame from "./pages/Videogame";
import Description from "./pages/Description";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");
    if (admin) {
      setIsAdmin(true);
    }
  }, []);

  const handleLogin = (token, isAdmin) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    handleAdmin(isAdmin);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const handleAdmin = (response) => {
    localStorage.setItem('isAdmin', response.role);
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginView onLogin={handleLogin} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/token_email" element={
        <Protected admin isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
          <NavbarAdmin onLogout={handleLogout} />
          <TokenEmail onLogout={handleLogout} />
        </Protected>
      } />
      <Route path="/admin_page" element={
        <Protected admin isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
          <NavbarAdmin onLogout={handleLogout} />
          <AdminPage onLogout={handleLogout} />
        </Protected>
      } />
      <Route path="/profile/:id" element={
        <Protected isLoggedIn={isLoggedIn}>
          <NavbarAdmin onLogout={handleLogout} />
          <ProfileView onLogout={handleLogout} />
        </Protected>
      } />
      <Route path="/videogame" element={
        <Protected isLoggedIn={isLoggedIn}>
          <NavbarAdmin onLogout={handleLogout} />
          <Videogame onLogout={handleLogout} />
        </Protected>
      } />
      <Route path="/description" element={
        <Protected isLoggedIn={isLoggedIn}>
          <NavbarAdmin onLogout={handleLogout} />
          <Description onLogout={handleLogout} />
        </Protected>
      } />
      <Route
        path="/"
        element={
          <>
            <Landing />
          </>
        }
      />
    </Routes>
  );
}

export default App;
