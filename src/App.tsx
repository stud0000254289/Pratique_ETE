// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import VacationTable from './components/VacationTable';
import EmployeeList from './components/EmployeeList';
import Header from './components/Header'; 
import './App.css'; 

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
    <Router>
      {isAuthenticated && <Header />}  
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin" element={isAuthenticated ? (
          <div>
            <EmployeeList />
            <VacationTable />
          </div>
        ) : (
          <Navigate to="/login" />
        )} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/admin" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;












