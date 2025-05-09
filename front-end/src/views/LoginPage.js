import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";

export function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  const users = [
    { username: 'profesor', password: 'profesor', role: 'profesor' },
    { username: 'student', password: 'student', role: 'student' },
    { username: 'administrator', password: 'administrator', role: 'administrator' }
  ];

  const [role, setRole] = useState(null);

  const handleLogin = (user) => {
    onLogin(user); 
    navigate('/orar'); 
  };

  return (
    <div>
      {!role ? (
        <>
          <h2>Selectează tipul de utilizator</h2>
          <button onClick={() => setRole('student')}>Student</button>
          <button onClick={() => setRole('profesor')}>Profesor</button>
          <button onClick={() => setRole('administrator')}>Administrator</button>
        </>
      ) : (
        <>
          <h3>Autentificare - {role}</h3>
          <LoginForm users={users} role={role} onLogin={handleLogin} />
        </>
      )}
    </div>
  );
}
