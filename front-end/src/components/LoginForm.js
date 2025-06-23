import { useState } from 'react';
import { MainButton } from "../components/MainButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; 
import './styles/Orar.css';  

export function LoginForm({ users, onLogin }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const user = users.find(
      user => 
        user.username === userName &&
        user.password === password
    );

    if (user) {
      console.log('Autentificat ca:', user);
      onLogin(user);
    } else {
      setError('Date incorecte');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="groupForm">
        <input placeholder='E-mail' name='email'
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
      </div>
      <div className="groupForm">
        <input placeholder='Password'
          type="password" name='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MainButton text="Login" type="submit" />
    </form>
  );
}
