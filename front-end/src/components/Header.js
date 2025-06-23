import React from 'react';
import './styles/Orar.css';  

export function Header({ user }) {

  return (
    <header className='bar'>
      <div className='wrapperBar'>
        <h2>{ user?.username}</h2>
      </div>
    </header>
  );
}
