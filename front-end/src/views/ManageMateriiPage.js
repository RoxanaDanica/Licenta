import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axios';

export const ManageMateriiPage = () => {
  const [numeMaterie, setNumeMaterie] = useState('');
  const [materii, setMaterii] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMaterii();
  }, []);

  const fetchMaterii = async () => {
    try {
      const response = await axiosInstance.get('/materii');
      setMaterii(response.data);
    } catch (error) {
      console.error('Eroare la fetch:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // UPDATE
        await axiosInstance.put(`/materie/${editId}`, { nume_materie: numeMaterie });
        await fetchMaterii(); 
        setEditId(null);
      } else {
        // CREATE
        await axiosInstance.post('/materie', { nume_materie: numeMaterie });
        await fetchMaterii();  
      }
      setNumeMaterie('');
    } catch (error) {
      console.error('Eroare la salvare:', error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/materie/${id}`);
      setMaterii(materii.filter(mat => mat.id !== id));
    } catch (error) {
      console.error('Eroare la ștergere:', error);
    }
  };

  const handleEdit = (mat) => {
    setNumeMaterie(mat.nume_materie);
    setEditId(mat.id);
  };

  return (
    <div>
      <h1>Manage Materii</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="numeMaterie">Name</label>
          <input
            type="text"
            id="numeMaterie"
            value={numeMaterie}
            onChange={(e) => setNumeMaterie(e.target.value)}
            required
          />
        </div>
        <button type="submit">{editId ? 'Update' : 'Save'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setNumeMaterie(''); }}>Anulează</button>}
      </form>

      <div className='lista-materii'>
        <ul>
          {materii.map((mat) => (
            <li key={mat.id}>
              {mat.nume_materie}
              <button onClick={() => handleEdit(mat)}>Edit</button>
              <button onClick={() => handleDelete(mat.id)}>Șterge</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
