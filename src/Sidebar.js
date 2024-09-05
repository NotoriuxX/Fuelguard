import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <div className="flex items-center justify-center h-16">
        <h1 className="text-xl font-bold">FuelGuard</h1>
      </div>
      <ul className="mt-6">
        <li className="px-6 py-3 hover:bg-gray-700">
          <a href="#">Dashboard</a>
        </li>
        <li className="px-6 py-3 hover:bg-gray-700">
          <a href="#">Lista de Usuarios</a>
        </li>
        <li className="px-6 py-3 hover:bg-gray-700">
          <a href="#">Camiones</a>
        </li>
        <li className="px-6 py-3 hover:bg-gray-700">
          <a href="#">Guías</a>
        </li>
        <li className="px-6 py-3 hover:bg-gray-700">
          <a href="#">Calendario</a>
        </li>
        <li className="px-6 py-3 hover:bg-gray-700">
          <a href="#">Inbox</a>
        </li>
        <li className="px-6 py-3 hover:bg-gray-700">
          <a href="#">Chat</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

