import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { OrarPage } from './views/OrarPage';
import { LoginPage } from './views/LoginPage'; 

function AppRoutes({ user, setUser }) {
  const location = useLocation();

  if (!user && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  if (user && location.pathname === '/login') {
    return <Navigate to="/orar" replace />;
  }

  return (
    <>
      {user && (
        <>
          <h2>{user.role} / orar</h2>
          <button onClick={() => { localStorage.removeItem('user'); setUser(null); }}>Logout</button>
        </>
      )}

      <Routes>
        <Route path="/login" element={<LoginPage onLogin={(user) => {
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
        }} />} />
        <Route path="/orar" element={<OrarPage user={user} />} />
        <Route path="*" element={<Navigate to={user ? "/orar" : "/login"} replace />} />
      </Routes>
    </>
  );
}

export function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <BrowserRouter>
      <div className='wrapper'>
        <AppRoutes user={user} setUser={setUser} />
      </div>
    </BrowserRouter>
  );
}

export default App;
