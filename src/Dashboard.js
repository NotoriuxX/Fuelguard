import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faChartBar, faChartPie, faUsers } from '@fortawesome/free-solid-svg-icons';

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

const dayData = [
  { name: '00:00', value: 5 }, { name: '01:00', value: 10 }, { name: '02:00', value: 15 },
  { name: '03:00', value: 12 }, { name: '04:00', value: 18 }, { name: '05:00', value: 16 },
];

const monthData = Array.from({ length: 30 }, (_, i) => ({
  name: `Day ${i + 1}`, value: Math.floor(Math.random() * 100),
}));

const yearData = Array.from({ length: 12 }, (_, i) => ({
  name: `Month ${i + 1}`, value: Math.floor(Math.random() * 100),
}));

const fiveYearsData = Array.from({ length: 5 }, (_, i) => ({
  name: `Year ${2019 + i}`, value: Math.floor(Math.random() * 500),
}));

const Dashboard = () => {
  const [viajesChartType, setViajesChartType] = useState('line');
  const [clicksChartType, setClicksChartType] = useState('line');
  const [conversionsChartType, setConversionsChartType] = useState('line');
  const [usersChartType, setUsersChartType] = useState('line');
  const [selectedTimeRange, setSelectedTimeRange] = useState('day'); // Estado para manejar el rango de tiempo seleccionado

  // Función para obtener los datos basados en el rango de tiempo seleccionado (solo afecta al Comparative Summary)
  const getComparativeDataBasedOnTimeRange = () => {
    switch (selectedTimeRange) {
      case 'day':
        return dayData;
      case 'month':
        return monthData;
      case '12months':
        return yearData;
      case '1year':
        return yearData; // Mismos datos, pero podría ser diferente si se obtienen datos anuales
      case '5years':
        return fiveYearsData;
      default:
        return dayData;
    }
  };

  const toggleViajesChartType = () => {
    setViajesChartType(viajesChartType === 'line' ? 'bar' : viajesChartType === 'bar' ? 'area' : 'line');
  };

  const toggleClicksChartType = () => {
    setClicksChartType(clicksChartType === 'line' ? 'bar' : clicksChartType === 'bar' ? 'area' : 'line');
  };

  const toggleConversionsChartType = () => {
    setConversionsChartType(conversionsChartType === 'line' ? 'bar' : conversionsChartType === 'bar' ? 'area' : 'line');
  };

  const toggleUsersChartType = () => {
    setUsersChartType(usersChartType === 'line' ? 'bar' : usersChartType === 'bar' ? 'area' : 'line');
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="container mx-auto px-6 w-full">
        {/* Primera Fila con 4 cuadros */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {/* Total Viajes */}
          <div className="bg-white p-4 shadow-md rounded-lg w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-700 text-xl">Total Viajes</h2>
              <FontAwesomeIcon
                icon={viajesChartType === 'line' ? faChartBar : viajesChartType === 'bar' ? faChartPie : faChartLine}
                className="cursor-pointer text-gray-500 ml-2"
                onClick={toggleViajesChartType}
              />
            </div>
            <p className="text-sm font-light mt-2">694 viajes</p>
            <div className="my-4 w-full h-24">
              <ResponsiveContainer width="100%" height="100%">
                {viajesChartType === 'line' ? (
                  <Sparklines data={viajesData} limit={8}>
                    <SparklinesLine color="blue" />
                  </Sparklines>
                ) : viajesChartType === 'bar' ? (
                  <BarChart data={viajesData.map((val, index) => ({ name: index, value: val }))}>
                    <Bar dataKey="value" fill="blue" />
                  </BarChart>
                ) : (
                  <AreaChart data={viajesData.map((val, index) => ({ name: index, value: val }))}>
                    <Area dataKey="value" fill="blue" stroke="blue" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
            <p className="text-2xl font-bold text-green-500 mt-2">+5%</p>
            <p className="text-sm text-gray-500">compared to last month</p>
          </div>

          {/* Total Clicks */}
          <div className="bg-white p-4 shadow-md rounded-lg w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-700 text-xl">Total Clicks</h2>
              <FontAwesomeIcon
                icon={clicksChartType === 'line' ? faChartBar : clicksChartType === 'bar' ? faChartPie : faChartLine}
                className="cursor-pointer text-gray-500 ml-2"
                onClick={toggleClicksChartType}
              />
            </div>
            <p className="text-sm font-light mt-2">789 clicks</p>
            <div className="my-4 w-full h-24">
              <ResponsiveContainer width="100%" height="100%">
                {clicksChartType === 'line' ? (
                  <Sparklines data={clicksData} limit={8}>
                    <SparklinesLine color="green" />
                  </Sparklines>
                ) : clicksChartType === 'bar' ? (
                  <BarChart data={clicksData.map((val, index) => ({ name: index, value: val }))}>
                    <Bar dataKey="value" fill="green" />
                  </BarChart>
                ) : (
                  <AreaChart data={clicksData.map((val, index) => ({ name: index, value: val }))}>
                    <Area dataKey="value" fill="green" stroke="green" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
            <p className="text-2xl font-bold text-green-500 mt-2">+6%</p>
            <p className="text-sm text-gray-500">compared to last month</p>
          </div>

          {/* Conversions */}
          <div className="bg-white p-4 shadow-md rounded-lg w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-700 text-xl">Conversions</h2>
              <FontAwesomeIcon
                icon={conversionsChartType === 'line' ? faChartBar : conversionsChartType === 'bar' ? faChartPie : faChartLine}
                className="cursor-pointer text-gray-500 ml-2"
                onClick={toggleConversionsChartType}
              />
            </div>
            <p className="text-sm font-light mt-2">789 conversions</p>
            <div className="my-4 w-full h-24">
              <ResponsiveContainer width="100%" height="100%">
                {conversionsChartType === 'line' ? (
                  <Sparklines data={conversionsData} limit={8}>
                    <SparklinesLine color="red" />
                  </Sparklines>
                ) : conversionsChartType === 'bar' ? (
                  <BarChart data={conversionsData.map((val, index) => ({ name: index, value: val }))}>
                    <Bar dataKey="value" fill="red" />
                  </BarChart>
                ) : (
                  <AreaChart data={conversionsData.map((val, index) => ({ name: index, value: val }))}>
                    <Area dataKey="value" fill="red" stroke="red" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
            <p className="text-2xl font-bold text-green-500 mt-2">+1%</p>
            <p className="text-sm text-gray-500">compared to last month</p>
          </div>

          {/* Active Users */}
          <div className="bg-white p-4 shadow-md rounded-lg w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-700 text-xl">Active Users</h2>
              <FontAwesomeIcon
                icon={usersChartType === 'line' ? faChartBar : usersChartType === 'bar' ? faChartPie : faChartLine}
                className="cursor-pointer text-gray-500 ml-2"
                onClick={toggleUsersChartType}
              />
            </div>
            <p className="text-sm font-light mt-2">21 active users</p>
            <div className="my-4 w-full h-24">
              <ResponsiveContainer width="100%" height="100%">
                {usersChartType === 'line' ? (
                  <Sparklines data={usersData} limit={8}>
                    <SparklinesLine color="orange" />
                  </Sparklines>
                ) : usersChartType === 'bar' ? (
                  <BarChart data={usersData.map((val, index) => ({ name: index, value: val }))}>
                    <Bar dataKey="value" fill="orange" />
                  </BarChart>
                ) : (
                  <AreaChart data={usersData.map((val, index) => ({ name: index, value: val }))}>
                    <Area dataKey="value" fill="orange" stroke="orange" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
            <p className="text-2xl font-bold text-blue-500 mt-2">+2%</p>
            <p className="text-sm text-gray-500">this week</p>
          </div>
        </div>

        {/* Segunda fila */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 w-full">
          {/* Primera columna: Comparación de todos */}
          <div className="bg-white p-6 shadow-md rounded-lg w-full h-full relative">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={getComparativeDataBasedOnTimeRange()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="value" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>

            {/* Selector de intervalo de tiempo dentro del cuadro comparativo */}
            <div className="absolute bottom-4 right-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timeRange">
                Seleccionar Intervalo de Tiempo:
              </label>
              <select
                id="timeRange"
                className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
              >
                <option value="day">Día</option>
                <option value="month">Mes</option>
                <option value="12months">Últimos 12 meses</option>
                <option value="1year">1 Año</option>
                <option value="5years">Últimos 5 Años</option>
              </select>
            </div>
          </div>

          {/* Segunda columna: Active Users + Sales Summary + Customers */}
          <div className="grid grid-cols-2 gap-6 w-full h-full">
            {/* Columna 1: Active Users Right Now (fijo) */}
            <div className="col-span-1 bg-blue-500 p-4 shadow-md rounded-lg text-white w-full h-full relative">
              <h2 className="text-lg font-semibold">Active Users right now</h2>
              <p className="text-4xl font-bold">21</p>
              <p className="text-sm mt-2">Page views per minute</p>

              {/* Gráfico de barras (fijo) */}
              <div className="my-4 w-full h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usersData.map((value, index) => ({ name: index + 1, value }))}>
                    <XAxis dataKey="name" />
                    <Bar dataKey="value" fill="rgba(255, 255, 255, 0.8)" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Top Active Pages */}
              <div className="mt-4">
                <p className="text-sm">Top Active Pages</p>
                <p>/apps/calendar</p>
                <p>/apps/inbox</p>
              </div>
            </div>

            {/* Columna 2: Sales Summary y Customers */}
            <div className="grid grid-rows-2 gap-6 w-full h-full">
              {/* Sales Summary */}
              <div className="bg-white p-4 shadow-md rounded-lg w-full h-full">
                <h2 className="text-gray-700 text-xl">Sales Summary</h2>
                <p className="text-sm text-gray-500">Compare Sales by Time</p>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-green-500">473 <span className="text-sm text-gray-500">Monthly Sales</span></p>
                  <p className="text-2xl font-bold text-red-500">46 <span className="text-sm text-gray-500">Sales Today</span></p>
                </div>
                <div className="mt-4 w-full h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <Area dataKey="value" stroke="green" fill="lightgreen" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Customers */}
              <div className="bg-white p-4 shadow-md rounded-lg flex items-center justify-between w-full">
                <div>
                  <p className="text-2xl font-bold">234</p>
                  <p className="text-sm text-gray-500">Customers</p>
                </div>
                <FontAwesomeIcon icon={faUsers} className="text-gray-500" size="2x" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
