import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutButton } from './LogoutButton'; 
import './styles/Orar.css';  

export function HeaderProfesor({ setUser }) {
  const navigate = useNavigate();

  return (
    <header className='navBar'>
      <div className='wrapperNavBar wrapper'>
        <div className="logo">
          <h2>EFS</h2>
        </div>
        <nav>
          <ul>
            <li><a onClick={() => navigate('/orar')}>Orar</a></li>
            <li><a onClick={() => navigate('/materii')}>Materii</a></li>
            <li><a onClick={() => navigate('/profesori')}>Profesori</a></li>
            <li><LogoutButton setUser={setUser}  /></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
