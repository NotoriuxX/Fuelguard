// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Profile from './Profile';
import ListaUsuarios from './ListaUsuarios'; // Importa el nuevo componente
import Camiones from './Camiones';  // Importa el nuevo componente

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<ListaUsuarios />} /> {/* Nueva ruta */}
          <Route path="/camiones" element={<Camiones />} />  {/* Nueva ruta para Camiones */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
