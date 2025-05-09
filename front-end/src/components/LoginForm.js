import { useState } from 'react';

export function LoginForm({ users, role, onLogin }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const user = users.find(
      user =>
        user.username === userName &&
        user.password === password &&
        user.role === role
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
        <label>Utilizator: </label>
        <input
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
      </div>
      <div className="groupForm">
        <label>Parola: </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
