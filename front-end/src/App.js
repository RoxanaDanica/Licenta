import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { OrarPage } from './views/OrarPage';
import { LoginPage } from './views/LoginPage';
import { AdministratorPage } from './views/AdministratorPage';
import { ManageProfesoriPage } from './views/ManageProfesoriPage';
import { ManageMateriiPage } from './views/ManageMateriiPage';
import { HeaderProfesor } from './components/HeaderProfesor'; 
import { HeaderStudent } from './components/HeaderStudent';

function InnerApp({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  if (!user && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {user?.role === 'profesor' && <HeaderProfesor setUser={setUser} />}
      {user?.role === 'student' && <HeaderStudent setUser={setUser} />}

      <Routes>
        <Route path="/login" element={
          <LoginPage onLogin={(user) => {
            setUser(user); 
          }} />
        } />
        <Route path="/profesori" element={<ManageProfesoriPage />} />
        <Route path="/materii" element={<ManageMateriiPage />} />
        {user?.role !== 'administrator' && (
          <Route path="/orar" element={<OrarPage user={user} />} />
        )}
        {user?.role === 'administrator' && (
          <Route path="/administrator" element={<AdministratorPage />} />
        )}
        <Route path="*" element={<Navigate to={user?.role === 'administrator' ? "/administrator" : "/orar"} replace />} />
      </Routes>
    </>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <BrowserRouter>
      <InnerApp user={user} setUser={setUser} />
    </BrowserRouter>
  );
}

export default App;
