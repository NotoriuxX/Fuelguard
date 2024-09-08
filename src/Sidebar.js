import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar el estado del sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Overlay para pantallas pequeñas cuando el Sidebar está abierto */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 z-40 lg:translate-x-0 lg:relative lg:block shadow-xl`}
      >
        <div className="flex flex-col items-center justify-center h-16">
          <h1 className="text-xl font-bold">FuelGuard</h1>
        </div>

        {/* Foto del usuario con borde personalizado */}
        <div className="flex flex-col items-center mt-4">
          <a href="/profile">
            <div className="relative w-24 h-24">
              <img
                src="/images/user2.jpg"  // Aquí está la ruta de la imagen
                alt="User Profile"
                className="w-full h-full rounded-full object-cover border-2 border-gray-800 transition-colors duration-300"
              />
              <div className="absolute inset-0 rounded-full border-2 border-transparent hover:border-green-500 transition-colors duration-300"></div>
            </div>
          </a>
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

      {/* Botón para abrir/cerrar el sidebar */}
      <button
        className="fixed top-4 left-4 z-50 p-3 bg-gray-800 bg-opacity-80 text-white rounded-2xl focus:outline-none shadow-lg lg:hidden"
        onClick={toggleSidebar}
        aria-expanded={isOpen}
        aria-controls="sidebar"
      >
        <FontAwesomeIcon icon={isOpen ? faArrowLeft : faBars} />
      </button>
    </div>
  );
};

export default Sidebar;
