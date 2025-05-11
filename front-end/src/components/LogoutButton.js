// components/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function LogoutButton({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <a onClick={handleLogout} className="logout-button">
      Logout
    </a>
  );
}
