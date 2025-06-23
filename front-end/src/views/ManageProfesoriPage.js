import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axios';
import { MainButton } from '../components/MainButton';
import { Layout } from '../components/Layout';

export const ManageProfesoriPage = ( { user } ) => {
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
    <Layout user={user}>
      <div>
      <h1 className='wrapper'>Profesori</h1>
      <form className='wrapper generalPadding formContainer' onSubmit={handleSubmit}>
        <div className="formWrapper">
          <h3>Adauga profesor nou</h3>
          <div className='wrapperInput'>
            <input placeholder='Nume profesor' type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required />
            <label></label>
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
            <MainButton text={editId ? 'Update' : 'Save'} type="submit"></MainButton>
              {editId && (
                <MainButton
                  type="button" text="Anulează"
                  onClick={() => {
                    setEditId(null);
                    setName('');
                    setMaterie('');
                  }}
                >
                  
                </MainButton>
            )}
          </div>
        </div>
      </form>
      <div className="lista-profesori">
            <table className='wrapper generalPadding'>
              <thead>
                <tr>
                  <th>Nume profesor</th>
                  <th>Nume materie preferata</th>
                  <th>Optiuni</th>
                </tr>
              </thead>
              <tbody>
                {profesori.map((prof) => (
                  <tr key={prof.id}>
                    <td className='box'>{prof.nume_profesor}</td>
                    <td className='box'>{prof.nume_materie}</td>
                    <td className='wrapperBtns'>
                      <MainButton onClick={() => handleEdit(prof)} text="Edit"/>
                      <MainButton style={ {marginTop: 10 + 'px', marginBottom: 10 + 'px'}} onClick={() => handleDelete(prof.id)} text="Delete" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
      </div>
    </div>
    </Layout>
  );
};
