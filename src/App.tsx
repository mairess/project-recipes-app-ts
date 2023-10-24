import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={ <Login /> } />
      </Routes>
    </AppProvider>
  );
}

export default App;
