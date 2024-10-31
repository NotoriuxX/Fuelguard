import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';

const Camiones = () => {
  // Datos de los camiones
  const [camiones] = useState([
    { nombre: 'Camión Volvo FH', patente: 'PLT1234', usuario: 'Juan Pérez', petroleo: 80, activo: true },
    { nombre: 'Camión Scania R', patente: 'PLT5678', usuario: 'Luis Martínez', petroleo: 50, activo: true },
    { nombre: 'Camión Mercedes Actros', patente: 'PLT9101', usuario: 'Carlos Ramírez', petroleo: 65, activo: true },
    { nombre: 'Camión Volvo FH', patente: 'PLT2345', usuario: 'Pedro López', petroleo: 25, activo: false },
    { nombre: 'Camión Scania R', patente: 'PLT3456', usuario: 'Diego Castro', petroleo: 90, activo: true },
    { nombre: 'Camión Mercedes Actros', patente: 'PLT4567', usuario: 'Roberto Díaz', petroleo: 40, activo: false },
    { nombre: 'Camión Volvo FH', patente: 'PLT6789', usuario: 'Jorge Flores', petroleo: 85, activo: true },
    { nombre: 'Camión Scania R', patente: 'PLT7890', usuario: 'Ricardo Gutiérrez', petroleo: 70, activo: true },
    { nombre: 'Camión Mercedes Actros', patente: 'PLT8901', usuario: 'Fernando Ortiz', petroleo: 55, activo: true },
    { nombre: 'Camión Volvo FMX', patente: 'PLT6543', usuario: null, petroleo: 20, activo: false },
    { nombre: 'Camión Scania XT', patente: 'PLT3210', usuario: 'Gabriela Castillo', petroleo: 75, activo: true },
    { nombre: 'Camión Iveco Stralis', patente: 'PLT1122', usuario: 'María González', petroleo: 30, activo: false },
    { nombre: 'Camión MAN TGX', patente: 'PLT7788', usuario: 'Sofía Herrera', petroleo: 95, activo: true },
    { nombre: 'Camión Renault Trucks T', patente: 'PLT4455', usuario: null, petroleo: 60, activo: false },
    { nombre: 'Camión Kenworth T680', patente: 'PLT9988', usuario: 'Lucía Muñoz', petroleo: 45, activo: false },
    { nombre: 'Camión Freightliner Cascadia', patente: 'PLT5566', usuario: null, petroleo: 50, activo: false },
    { nombre: 'Camión Volvo VNL', patente: 'PLT8899', usuario: 'Ana Sánchez', petroleo: 100, activo: true },
    { nombre: 'Camión Peterbilt 579', patente: 'PLT7744', usuario: 'Silvia Rojas', petroleo: 55, activo: false },
    { nombre: 'Camión Mack Anthem', patente: 'PLT6655', usuario: 'Héctor Benítez', petroleo: 80, activo: true },
    { nombre: 'Camión Western Star 5700XE', patente: 'PLT3322', usuario: null, petroleo: 35, activo: false },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('todos');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrado y búsqueda
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

  // Paginación
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentCamiones = filteredCamiones.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredCamiones.length / itemsPerPage);

  // Cambiar página
  const changePage = (newPage) => setCurrentPage(newPage);

  // Exportar a Excel
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

      {/* Búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre o usuario..."
        className="border p-2 rounded w-full mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filtro y selección de cantidad por página */}
      <div className="flex justify-between items-center mb-4">
        {/* Filtro */}
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

        {/* Selección de cantidad por página */}
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

      {/* Lista de camiones en forma de tarjetas */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {currentCamiones.map((camion, index) => (
          <div key={index} className={`p-4 border rounded ${camion.activo ? 'bg-green-100' : 'bg-red-100'}`}>
            <h2 className="text-lg font-bold">{camion.nombre}</h2>
            <p>Patente: {camion.patente}</p>
            <p>Usuario: {camion.usuario || 'No asignado'}</p>
            <div className="mt-2">
              <div className="h-4 w-full bg-gray-200 rounded">
                <div
                  className="h-full bg-green-500 rounded"
                  style={{ width: `${camion.petroleo}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1 text-center">{camion.petroleo}% de Petroleo</p>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
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
            className={`px-4 py-2 border rounded ${
              page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
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

      {/* Botón para exportar a Excel */}
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
