import React, { useState } from "react";
import HomePage from "./pages/homePage";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/authPage";
import Navbar from "./components/Navbar/Navbar";
import { IUser } from "./types/types";
function App() {
  const [user, setUser] = useState<IUser>();

  const handleLogin = (userData: IUser) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(undefined);
  };

  return (
    <div className="App">
      <Navbar handleLogout={handleLogout} user={user} />
      <Routes>
        {user ? (
          <Route path="/" element={<HomePage userData={user} />} />
        ) : (
          <Route path="/" element={<Auth handleLogin={handleLogin} />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
