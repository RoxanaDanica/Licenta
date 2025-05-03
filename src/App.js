import { useState } from 'react';
import './App.css';
import { OrarPage } from './views/OrarPage';
import { LoginPage } from './views/LoginPage'; 

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className='wrapper'>
      {!user ? (
        <LoginPage onLogin={setUser} />
      ) : (
        <>
          <h2>{user.username} ({user.role})</h2>
          <button onClick={() => setUser(null)}>Logout</button> 
          <OrarPage user={user} />
        </>
      )}
    </div>
  );
}

export default App;
