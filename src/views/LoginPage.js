import { useState } from "react";
import { LoginForm } from "../components/LoginForm";

export function LoginPage({ onLogin }) {
  const users = [
    { username: 'profesor', password: 'profesor', role: 'profesor' },
    { username: 'student', password: 'student', role: 'student' }
  ];

  const [role, setRole] = useState(null);

  return (
    <div>
      {!role ? (
        <>
          <h2>Selectează tipul de utilizator</h2>
          <button onClick={() => setRole('student')}>Student</button>
          <button onClick={() => setRole('profesor')}>Profesor</button>
        </>
      ) : (
        <>
          <h3>Autentificare - {role}</h3>
          <LoginForm users={users} role={role} onLogin={onLogin} />
        </>
      )}
    </div>
  );
}
