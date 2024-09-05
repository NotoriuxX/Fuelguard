import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Sparklines, SparklinesLine } from 'react-sparklines';

// Importamos los íconos de Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faChartBar } from '@fortawesome/free-solid-svg-icons';

// Datos de ejemplo para los gráficos
const data = [
  { name: 'Jan', value: 60 },
  { name: 'Feb', value: 30 },
  { name: 'Mar', value: 45 },
  { name: 'Apr', value: 50 },
  { name: 'May', value: 80 },
  { name: 'Jun', value: 55 },
  { name: 'Jul', value: 20 },
  { name: 'Aug', value: 40 },
  { name: 'Sep', value: 75 },
  { name: 'Oct', value: 85 },
  { name: 'Nov', value: 60 },
  { name: 'Dec', value: 70 },
];

const viajesData = [40, 50, 60, 70, 65, 80, 60, 55];
const clicksData = [30, 40, 35, 50, 55, 65, 75, 80];
const conversionsData = [20, 25, 30, 35, 40, 50, 55, 60];
const usersData = [5, 10, 12, 20, 25, 30, 35, 40];

const Dashboard = () => {
  const [chartType, setChartType] = useState('line'); // Estado para alternar el tipo de gráfico

  // Función para alternar entre gráficos de línea y barras
  const toggleChartType = () => {
    setChartType(chartType === 'line' ? 'bar' : 'line');
  };

  return (
    <div className="p-6 bg-gray-100 h-screen">
      <div className="grid grid-cols-4 gap-6">
        {/* Total Viajes con gráfico y opción para cambiar tipo */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-gray-700 text-xl">Total Viajes</h2>
          <p className="text-sm font-light mt-2">694 viajes</p>
          
          {/* Gráfico (Cambiar según tipo seleccionado) */}
          <div className="my-4">
            {chartType === 'line' ? (
              <Sparklines data={viajesData} limit={8} width={100} height={30} margin={5}>
                <SparklinesLine color="blue" />
              </Sparklines>
            ) : (
              <BarChart width={100} height={30} data={viajesData.map((val, index) => ({ name: index, value: val }))}>
                <Bar dataKey="value" fill="blue" />
              </BarChart>
            )}
          </div>

          <p className="text-2xl font-bold text-green-500 mt-2">+5%</p>
          <p className="text-sm text-gray-500">compared to last month</p>
          
          {/* Botón para alternar el tipo de gráfico con ícono */}
          <button 
            onClick={toggleChartType} 
            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded flex items-center"
          >
            {/* Muestra el ícono correspondiente */}
            {chartType === 'line' ? (
              <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            ) : (
              <FontAwesomeIcon icon={faChartLine} className="mr-2" />
            )}
            Cambiar
          </button>
        </div>

        {/* Total Clicks con gráfico y opción para cambiar tipo */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-gray-700 text-xl">Total Clicks</h2>
          <p className="text-sm font-light mt-2">789 clicks</p>

          <div className="my-4">
            {chartType === 'line' ? (
              <Sparklines data={clicksData} limit={8} width={100} height={30} margin={5}>
                <SparklinesLine color="green" />
              </Sparklines>
            ) : (
              <BarChart width={100} height={30} data={clicksData.map((val, index) => ({ name: index, value: val }))}>
                <Bar dataKey="value" fill="green" />
              </BarChart>
            )}
          </div>

          <p className="text-2xl font-bold text-green-500 mt-2">+6%</p>
          <p className="text-sm text-gray-500">compared to last month</p>

          <button 
            onClick={toggleChartType} 
            className="mt-2 bg-green-500 text-white px-4 py-1 rounded flex items-center"
          >
            {chartType === 'line' ? (
              <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            ) : (
              <FontAwesomeIcon icon={faChartLine} className="mr-2" />
            )}
            Cambiar
          </button>
        </div>

        {/* Conversions con gráfico y opción para cambiar tipo */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-gray-700 text-xl">Conversions</h2>
          <p className="text-sm font-light mt-2">789 conversions</p>

          <div className="my-4">
            {chartType === 'line' ? (
              <Sparklines data={conversionsData} limit={8} width={100} height={30} margin={5}>
                <SparklinesLine color="red" />
              </Sparklines>
            ) : (
              <BarChart width={100} height={30} data={conversionsData.map((val, index) => ({ name: index, value: val }))}>
                <Bar dataKey="value" fill="red" />
              </BarChart>
            )}
          </div>

          <p className="text-2xl font-bold text-green-500 mt-2">+1%</p>
          <p className="text-sm text-gray-500">compared to last month</p>

          <button 
            onClick={toggleChartType} 
            className="mt-2 bg-red-500 text-white px-4 py-1 rounded flex items-center"
          >
            {chartType === 'line' ? (
              <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            ) : (
              <FontAwesomeIcon icon={faChartLine} className="mr-2" />
            )}
            Cambiar
          </button>
        </div>

        {/* Active Users con gráfico y opción para cambiar tipo */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-gray-700 text-xl">Active Users</h2>
          <p className="text-sm font-light mt-2">21 active users</p>

          <div className="my-4">
            {chartType === 'line' ? (
              <Sparklines data={usersData} limit={8} width={100} height={30} margin={5}>
                <SparklinesLine color="orange" />
              </Sparklines>
            ) : (
              <BarChart width={100} height={30} data={usersData.map((val, index) => ({ name: index, value: val }))}>
                <Bar dataKey="value" fill="orange" />
              </BarChart>
            )}
          </div>

          <p className="text-2xl font-bold text-blue-500 mt-2">+2%</p>
          <p className="text-sm text-gray-500">this week</p>

          <button 
            onClick={toggleChartType} 
            className="mt-2 bg-orange-500 text-white px-4 py-1 rounded flex items-center"
          >
            {chartType === 'line' ? (
              <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            ) : (
              <FontAwesomeIcon icon={faChartLine} className="mr-2" />
            )}
            Cambiar
          </button>
        </div>
      </div>

      {/* Gráfico de líneas grande para las ventas del año */}
      <div className="mt-6 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-gray-700 text-xl">Sales Summary</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#8884d8" 
              activeDot={(data) => {
                if (Array.isArray(data)) {
                  const maxValue = Math.max(...data.map(d => d.value));
                  return data.value === maxValue ? { r: 10, stroke: '#ff7300' } : { r: 5 };
                } else {
                  return { r: 5 }; // Valor predeterminado si `data` no es un array
                }
              }}
              
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
