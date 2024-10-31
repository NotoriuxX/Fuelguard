// libreria npm install xlsx

// src/components/ListaUsuarios.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';

const ListaUsuarios = () => {
  // Datos ficticios de usuarios
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

  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [usuariosPorPagina, setUsuariosPorPagina] = useState(5);
  const [paginaActual, setPaginaActual] = useState(1);

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const coincideTexto =
      usuario.nombre.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      (usuario.camion && usuario.camion.toLowerCase().includes(filtroTexto.toLowerCase()));
    const coincideEstado =
      filtroEstado === 'todos' ||
      (filtroEstado === 'activos' && usuario.activo) ||
      (filtroEstado === 'inactivos' && !usuario.activo);
    return coincideTexto && coincideEstado;
  });

  const indiceUltimoUsuario = paginaActual * usuariosPorPagina;
  const indicePrimerUsuario = indiceUltimoUsuario - usuariosPorPagina;
  const usuariosPaginados = usuariosFiltrados.slice(indicePrimerUsuario, indiceUltimoUsuario);

  const cambiarPagina = (nuevaPagina) => setPaginaActual(nuevaPagina);
  const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);

  // Exportar a Excel
  const exportarAExcel = () => {
    const datosParaExcel = usuariosFiltrados.map((usuario) => ({
      Nombre: usuario.nombre,
      Camion: usuario.camion || 'No asignado',
      Estado: usuario.activo ? 'Activo' : 'Inactivo',
    }));

    const hoja = XLSX.utils.json_to_sheet(datosParaExcel);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Usuarios');
    XLSX.writeFile(libro, 'Usuarios_Filtrados.xlsx');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>

      {/* Filtro de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre o camión..."
        className="border p-2 rounded w-full mb-4"
        value={filtroTexto}
        onChange={(e) => setFiltroTexto(e.target.value)}
      />

      {/* Filtro de estado */}
      <div className="flex justify-between items-center mb-4">
        <div>
        <FontAwesomeIcon icon={faFilter} className="text-gray-700" />
        <select
          className="border p-2 rounded"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="activos">Activos</option>
          <option value="inactivos">Inactivos</option>
        </select>
        </div>
        
     

      {/* Selector de cantidad de usuarios por página */}
      <div>
      <label htmlFor="usuariosPorPagina" className="text-gray-700">
         
         </label>
         <select
           id="usuariosPorPagina"
           className="border p-2 rounded"
           value={usuariosPorPagina}
           onChange={(e) => {
             setUsuariosPorPagina(Number(e.target.value));
             setPaginaActual(1); // Resetear a la primera página al cambiar
           }}
         >
           <option value={5}>5</option>
           <option value={10}>10</option>
           <option value={20}>20</option>
           <option value={50}>50</option>
         </select>
      </div>
        
      </div>

      {/* Lista de usuarios paginada */}
      <ul>
        {usuariosPaginados.map((usuario, index) => (
          <li
            key={index}
            className={`p-4 border mb-2 rounded ${
              usuario.activo ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <strong>{usuario.nombre}</strong> -{' '}
            {usuario.camion ? `Conduce ${usuario.camion}` : 'Inactivo'}
          </li>
        ))}
      </ul>

      {/* Paginación */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Anterior
        </button>
        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((numero) => (
          <button
            key={numero}
            onClick={() => cambiarPagina(numero)}
            className={`px-4 py-2 border rounded ${
              numero === paginaActual ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {numero}
          </button>
        ))}
        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      {/* Botón para exportar a Excel */}
      <div className="flex justify-end mt-4">
        <button
          onClick={exportarAExcel}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
        >
          <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
          Exportar a Excel
        </button>
      </div>
    </div>
  );
};

export default ListaUsuarios;

