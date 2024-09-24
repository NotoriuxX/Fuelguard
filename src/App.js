import React from 'react';
import { Routes, Route } from 'react-router-dom';  // Importamos Routes y Route para definir rutas
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Profile from './Profile';


const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      {/* Contenido principal */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Agrega más rutas si lo necesitas */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
