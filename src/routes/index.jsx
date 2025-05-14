import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import Register from '../pages/register';
import Password from '../pages/password';
import Dashboard from '../pages/dashboard';
import Launch from '../pages/launch';
import Settings from '../pages/set';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recuperar-senha" element={<Password />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lancamentos" element={<Launch />} />
        <Route path="/configuracoes" element={<Settings />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
