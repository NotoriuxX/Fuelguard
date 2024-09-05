import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faChartBar, faChartPie } from '@fortawesome/free-solid-svg-icons'; 

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
  // Estado independiente para cada gráfico
  const [viajesChartType, setViajesChartType] = useState('line');
  const [clicksChartType, setClicksChartType] = useState('line');
  const [conversionsChartType, setConversionsChartType] = useState('line');
  const [usersChartType, setUsersChartType] = useState('line');

  // Funciones para alternar entre gráficos
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
    <div className="p-6 bg-gray-100 h-screen">
      <div className="grid grid-cols-4 gap-6">
        {/* Total Viajes con gráfico y opción para cambiar tipo */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-700 text-xl">Total Viajes</h2>
            <FontAwesomeIcon
              icon={viajesChartType === 'line' ? faChartBar : viajesChartType === 'bar' ? faChartPie : faChartLine}
              className="cursor-pointer text-gray-500 ml-2"
              onClick={toggleViajesChartType}
            />
          </div>

          <p className="text-sm font-light mt-2">694 viajes</p>

          <div className="my-4">
            {viajesChartType === 'line' ? (
              <Sparklines data={viajesData} limit={8} width={100} height={30} margin={5}>
                <SparklinesLine color="blue" />
              </Sparklines>
            ) : viajesChartType === 'bar' ? (
              <BarChart width={100} height={30} data={viajesData.map((val, index) => ({ name: index, value: val }))}>
                <Bar dataKey="value" fill="blue" />
              </BarChart>
            ) : (
              <AreaChart width={100} height={30} data={viajesData.map((val, index) => ({ name: index, value: val }))}>
                <Area dataKey="value" fill="blue" stroke="blue" />
              </AreaChart>
            )}
          </div>

          <p className="text-2xl font-bold text-green-500 mt-2">+5%</p>
          <p className="text-sm text-gray-500">compared to last month</p>
        </div>

        {/* Total Clicks con gráfico y opción para cambiar tipo */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-700 text-xl">Total Clicks</h2>
            <FontAwesomeIcon
              icon={clicksChartType === 'line' ? faChartBar : clicksChartType === 'bar' ? faChartPie : faChartLine}
              className="cursor-pointer text-gray-500 ml-2"
              onClick={toggleClicksChartType}
            />
          </div>

          <p className="text-sm font-light mt-2">789 clicks</p>

          <div className="my-4">
            {clicksChartType === 'line' ? (
              <Sparklines data={clicksData} limit={8} width={100} height={30} margin={5}>
                <SparklinesLine color="green" />
              </Sparklines>
            ) : clicksChartType === 'bar' ? (
              <BarChart width={100} height={30} data={clicksData.map((val, index) => ({ name: index, value: val }))}>
                <Bar dataKey="value" fill="green" />
              </BarChart>
            ) : (
              <AreaChart width={100} height={30} data={clicksData.map((val, index) => ({ name: index, value: val }))}>
                <Area dataKey="value" fill="green" stroke="green" />
              </AreaChart>
            )}
          </div>

          <p className="text-2xl font-bold text-green-500 mt-2">+6%</p>
          <p className="text-sm text-gray-500">compared to last month</p>
        </div>

        {/* Conversions con gráfico y opción para cambiar tipo */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-700 text-xl">Conversions</h2>
            <FontAwesomeIcon
              icon={conversionsChartType === 'line' ? faChartBar : conversionsChartType === 'bar' ? faChartPie : faChartLine}
              className="cursor-pointer text-gray-500 ml-2"
              onClick={toggleConversionsChartType}
            />
          </div>

          <p className="text-sm font-light mt-2">789 conversions</p>

          <div className="my-4">
            {conversionsChartType === 'line' ? (
              <Sparklines data={conversionsData} limit={8} width={100} height={30} margin={5}>
                <SparklinesLine color="red" />
              </Sparklines>
            ) : conversionsChartType === 'bar' ? (
              <BarChart width={100} height={30} data={conversionsData.map((val, index) => ({ name: index, value: val }))}>
                <Bar dataKey="value" fill="red" />
              </BarChart>
            ) : (
              <AreaChart width={100} height={30} data={conversionsData.map((val, index) => ({ name: index, value: val }))}>
                <Area dataKey="value" fill="red" stroke="red" />
              </AreaChart>
            )}
          </div>

          <p className="text-2xl font-bold text-green-500 mt-2">+1%</p>
          <p className="text-sm text-gray-500">compared to last month</p>
        </div>

        {/* Active Users con gráfico y opción para cambiar tipo */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-700 text-xl">Active Users</h2>
            <FontAwesomeIcon
              icon={usersChartType === 'line' ? faChartBar : usersChartType === 'bar' ? faChartPie : faChartLine}
              className="cursor-pointer text-gray-500 ml-2"
              onClick={toggleUsersChartType}
            />
          </div>

          <p className="text-sm font-light mt-2">21 active users</p>

          <div className="my-4">
            {usersChartType === 'line' ? (
              <Sparklines data={usersData} limit={8} width={100} height={30} margin={5}>
                <SparklinesLine color="orange" />
              </Sparklines>
            ) : usersChartType === 'bar' ? (
              <BarChart width={100} height={30} data={usersData.map((val, index) => ({ name: index, value: val }))}>
                <Bar dataKey="value" fill="orange" />
              </BarChart>
            ) : (
              <AreaChart width={100} height={30} data={usersData.map((val, index) => ({ name: index, value: val }))}>
                <Area dataKey="value" fill="orange" stroke="orange" />
              </AreaChart>
            )}
          </div>

          <p className="text-2xl font-bold text-blue-500 mt-2">+2%</p>
          <p className="text-sm text-gray-500">this week</p>
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
              activeDot={{ r: 8 }} // Ajuste simple para el tamaño del punto activo
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
