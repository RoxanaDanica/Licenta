import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axios';

export const ManageProfesoriPage = () => {
  const [name, setName] = useState('');
  const [materie, setMaterie] = useState('');
  const [materii, setMaterii] = useState([]);
  const [profesori, setProfesori] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProfesori();
    fetchMaterii();
  }, []);

  const fetchProfesori = async () => {
    try {
      const response = await axiosInstance.get('/profesori');
      setProfesori(response.data);
    } catch (error) {
      console.error('Eroare la fetch profesori:', error);
    } 
  };

  const fetchMaterii = async () => {
    try {
      const response = await axiosInstance.get('/materii');
      setMaterii(response.data);
    } catch (error) {
      console.error('Eroare la fetch materii:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axiosInstance.put(`/profesor/${editId}`, {
          nume_profesor: name,
          id_materie: materie,
        });
        setEditId(null);
      } else {
        await axiosInstance.post('/profesor', {
          nume_profesor: name,
          id_materie: materie,
        });
      }

      setName('');
      setMaterie('');
      fetchProfesori();
    } catch (error) {
      console.error('Eroare la salvare profesor:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/profesor/${id}`);
      setProfesori(profesori.filter((prof) => prof.id !== id));
    } catch (error) {
      console.error('Eroare la ștergere:', error);
    }
  };

  const handleEdit = (prof) => {
    setName(prof.nume_profesor);
    setMaterie(prof.id_materie);
    setEditId(prof.id);
  };

  return (
    <div>
      <h1>Manage Profesori</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name">Nume Profesor</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <label htmlFor="materie">Materie</label>
          <select
            id="materie"
            value={materie}
            onChange={(e) => setMaterie(e.target.value)}
            required
          >
            <option value="">Selectează materie preferata</option>
            {materii.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nume_materie}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{editId ? 'Update' : 'Save'}</button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setName('');
              setMaterie('');
            }}
          >
            Anulează
          </button>
        )}
      </form>

      <div className="lista-profesori">
        <ul>
          {profesori.map((prof) => (
            <li key={prof.id}>
              {prof.nume_profesor} - {prof.nume_materie}
              <button onClick={() => handleEdit(prof)}>Edit</button>
              <button onClick={() => handleDelete(prof.id)}>Șterge</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
