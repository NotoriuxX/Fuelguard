import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
import { createApi } from 'unsplash-js';

const unsplash = createApi({ accessKey: 'Rr8UbQnBhPOZpJw-hjY5CyKPvawd2rJ-VUBarEe9hEk' });

const Camiones = () => {
  const [camiones] = useState([
    { nombre: 'Camión Volvo FH', patente: 'PLT1234', usuario: 'Juan Pérez', petroleo: 80, activo: true },
    { nombre: 'Camión Scania R', patente: 'PLT5678', usuario: 'Luis Martínez', petroleo: 50, activo: true },
    { nombre: 'Camión Mercedes Actros', patente: 'PLT9101', usuario: 'Carlos Ramírez', petroleo: 70, activo: true },
    { nombre: 'Camión Volvo FH', patente: 'PLT2345', usuario: 'Pedro López', petroleo: 60, activo: true },
    { nombre: 'Camión Scania R', patente: 'PLT3456', usuario: 'Diego Castro', petroleo: 40, activo: true },
    { nombre: 'Camión Mercedes Actros', patente: 'PLT4567', usuario: 'Roberto Díaz', petroleo: 75, activo: true },
    { nombre: 'Camión Volvo FH', patente: 'PLT6789', usuario: 'Jorge Flores', petroleo: 90, activo: true },
    { nombre: 'Camión Scania R', patente: 'PLT7890', usuario: 'Ricardo Gutiérrez', petroleo: 55, activo: true },
    { nombre: 'Camión Mercedes Actros', patente: 'PLT8901', usuario: 'Fernando Ortiz', petroleo: 85, activo: true },
    { nombre: 'Camión Volvo FH', patente: 'PLT9012', usuario: 'Héctor Benítez', petroleo: 65, activo: true },
  ]);

  const [usuarios] = useState([
    { nombre: 'Juan Pérez', camion: 'Camión Volvo FH - PLT1234', activo: true },
    { nombre: 'María González', camion: null, activo: false },
    { nombre: 'Luis Martínez', camion: 'Camión Scania R - PLT5678', activo: true },
    { nombre: 'Ana Sánchez', camion: null, activo: false },
    { nombre: 'Carlos Ramírez', camion: 'Camión Mercedes Actros - PLT9101', activo: true },
    { nombre: 'Elena Vargas', camion: null, activo: false },
    { nombre: 'Pedro López', camion: 'Camión Volvo FH - PLT2345', activo: true },
    { nombre: 'Laura Moreno', camion: null, activo: false },
    { nombre: 'Diego Castro', camion: 'Camión Scania R - PLT3456', activo: true },
    { nombre: 'Julia Álvarez', camion: null, activo: false },
    { nombre: 'Roberto Díaz', camion: 'Camión Mercedes Actros - PLT4567', activo: true },
    { nombre: 'Patricia Vega', camion: null, activo: false },
    { nombre: 'Jorge Flores', camion: 'Camión Volvo FH - PLT6789', activo: true },
    { nombre: 'Sofía Herrera', camion: null, activo: false },
    { nombre: 'Ricardo Gutiérrez', camion: 'Camión Scania R - PLT7890', activo: true },
    { nombre: 'Lucía Muñoz', camion: null, activo: false },
    { nombre: 'Fernando Ortiz', camion: 'Camión Mercedes Actros - PLT8901', activo: true },
    { nombre: 'Silvia Rojas', camion: null, activo: false },
    { nombre: 'Héctor Benítez', camion: 'Camión Volvo FH - PLT9012', activo: true },
    { nombre: 'Gabriela Castillo', camion: null, activo: false },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('todos');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState({});

  const cargarImagenes = async () => {
    const nuevasImagenes = {};
    for (const camion of camiones) {
      try {
        const query = `camión ${camion.nombre}`;
        const response = await unsplash.search.getPhotos({
          query: query,
          page: 1,
          perPage: 1,
        });
        if (response.response && response.response.results.length > 0) {
          nuevasImagenes[camion.nombre] = response.response.results[0].urls.small;
        } else {
          nuevasImagenes[camion.nombre] = 'https://via.placeholder.com/150';
        }
      } catch (error) {
        console.error(`Error al obtener imagen para ${camion.nombre}:`, error);
        nuevasImagenes[camion.nombre] = 'https://via.placeholder.com/150';
      }
    }
    setImages(nuevasImagenes);
  };

  useEffect(() => {
    cargarImagenes();
  }, []);

  const filteredCamiones = camiones.filter((camion) => {
    const matchSearch =
      camion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (camion.usuario && camion.usuario.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchFilter =
      filter === 'todos' ||
      (filter === 'activos' && camion.activo) ||
      (filter === 'inactivos' && !camion.activo);
    return matchSearch && matchFilter;
  });

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentCamiones = filteredCamiones.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredCamiones.length / itemsPerPage);

  const changePage = (newPage) => setCurrentPage(newPage);

  const exportToExcel = () => {
    const dataToExport = filteredCamiones.map((camion) => ({
      Nombre: camion.nombre,
      Patente: camion.patente,
      Usuario: camion.usuario || 'No asignado',
      Estado: camion.activo ? 'Activo' : 'Inactivo',
      Petroleo: `${camion.petroleo}%`,
    }));

    const sheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'Camiones');
    XLSX.writeFile(workbook, 'Camiones_Filtrados.xlsx');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Camiones</h1>
      <input
        type="text"
        placeholder="Buscar por nombre o usuario..."
        className="border p-2 rounded w-full mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex justify-between items-center mb-4">
        <div>
          <FontAwesomeIcon icon={faFilter} className="text-gray-700 mr-2" />
          <select
            className="border p-2 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="activos">Activos</option>
            <option value="inactivos">Inactivos</option>
          </select>
        </div>

        <div>
          <select
            className="border p-2 rounded"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {currentCamiones.map((camion, index) => (
          <div key={index} className={`p-4 border rounded ${camion.activo ? 'bg-green-100' : 'bg-red-100'}`}>
            <img src={images[camion.nombre]} alt={camion.nombre} className="w-full h-32 object-cover mb-2 rounded" />
            <h2 className="text-lg font-bold">{camion.nombre}</h2>
            <p>Patente: {camion.patente}</p>
            <p>Usuario: {camion.usuario || 'No asignado'}</p>
            <div className="mt-2">
              <div className="h-4 w-full bg-gray-200 rounded relative">
                <div className="h-full bg-green-500 rounded" style={{ width: `${camion.petroleo}%` }}>
                  <span className="text-xs text-white font-bold absolute inset-0 flex items-center justify-center">
                    {camion.petroleo}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => changePage(page)}
            className={`px-4 py-2 border rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
        >
          <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
          Exportar a Excel
        </button>
      </div>
    </div>
  );
};

export default Camiones;
