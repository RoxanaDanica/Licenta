import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutButton } from './LogoutButton'; 
import './styles/Orar.css';  

export function HeaderStudent({ setUser }) {
  const navigate = useNavigate();

  return (
    <header className='navBar'>
      <div className='wrapperNavBar'>
        <nav>
          <ul>
            <li><a onClick={() => navigate('/Orar')}>Orar</a></li>
            <li><LogoutButton setUser={setUser}/></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
