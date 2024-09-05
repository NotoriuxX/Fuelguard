import React from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default App;
