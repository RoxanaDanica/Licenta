import { useNavigate } from 'react-router-dom';
import { LoginForm } from "../components/LoginForm";

export function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  const users = [
    { username: 'profesor', password: 'profesor', role: 'profesor' },
    { username: 'student', password: 'student', role: 'student' },
    { username: 'administrator', password: 'administrator', role: 'administrator' }
  ];

  const handleLogin = (user) => {
    if (user) {
      onLogin(user); 
      const destination = user.role === 'administrator' ? '/administrator' : '/orar';
      navigate(destination);
    } 
  };

  return (
    <div className="wrapperLoginPage">
      <div className='containerLoginForm'>
        <div className='wrapperTitle'>
          <h3>Departamentul de Educatie Fizica si Sport</h3>
        </div>
        <div className="wrapperLogin">
          <h3>Login EFS</h3>
          <LoginForm users={users} onLogin={handleLogin} />
        </div>
      </div>
    </div>
  );
}
