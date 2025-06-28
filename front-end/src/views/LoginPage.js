import { useNavigate } from 'react-router-dom';
import { LoginForm } from "../components/LoginForm";
import { axiosInstance } from '../api/axios';
import React, { useEffect, useState } from 'react';

export function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  const [studenti, setStudenti] = useState([]);
  const [allUsers, setAllUsers] = useState([
    { id: 0, username: 'profesor', password: 'profesor', role: 'profesor' },
    { id: 1, username: 'administrator', password: 'administrator', role: 'administrator' }
  ]);

  useEffect(() => {
    axiosInstance.get('/studenti').then(response => {
      setStudenti(response.data);
  
      const setRolStudent = response.data.map(student => ({
        id: student.id,
        username: student.username,
        password: student.password,
        role: 'student'
      }));
   

      axiosInstance.get('/profesori').then(profResponse => {
        const setRolProfesor = profResponse.data.map(profesor => ({
          id: profesor.id,
          username: profesor.nume_profesor,
          password: profesor.password,
          role: 'profesor'
        }));
  
        setAllUsers(prev => [
          ...prev,
          ...setRolStudent,
          ...setRolProfesor
        ]);
      });
  
    });
  }, []);
  
  

  const handleLogin = (user) => {
    if (user) {
      onLogin(user);
      const destination = user.role === 'administrator' ? '/orar' : '/orar'; 
      navigate(destination);

      const userWithId = { ...user, id: user.id };
      localStorage.setItem('user', JSON.stringify(userWithId));
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
          <LoginForm users={allUsers} onLogin={handleLogin} />
        </div>
      </div>
    </div>
  );
}
