import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axios';
import { MainButton } from '../components/MainButton';

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
    // <div>
    //   <h1>Manage Materii</h1>
    //   <form onSubmit={handleSubmit}>
    //     <div className="mb-4">
    //       <label htmlFor="numeMaterie">Name</label>
    //       <input
    //         type="text"
    //         id="numeMaterie"
    //         value={numeMaterie}
    //         onChange={(e) => setNumeMaterie(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <button type="submit">{editId ? 'Update' : 'Save'}</button>
    //     {editId && <button type="button" onClick={() => { setEditId(null); setNumeMaterie(''); }}>Anulează</button>}
    //   </form>

    //   <div className='lista-materii'>
    //     <ul>
    //       {materii.map((mat) => (
    //         <li key={mat.id}>
    //           {mat.nume_materie}
    //           <button onClick={() => handleEdit(mat)}>Edit</button>
    //           <button onClick={() => handleDelete(mat.id)}>Șterge</button>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
    <div>
  <h1 className='wrapper'>Materii</h1>
  <form className='wrapper generalPadding formContainer' onSubmit={handleSubmit}>
    <div className="formWrapper">
      <h3>Adauga materie noua</h3>
      <div className='wrapperInput'>
        <input type="text" placeholder='Nume materie' id="numeMaterie" value={numeMaterie} onChange={(e) => setNumeMaterie(e.target.value)} required />
        <MainButton type="submit" text={editId ? 'Update' : 'Save'}></MainButton>
        {editId && <MainButton type="button" text="Anulează" onClick={() => { setEditId(null); setNumeMaterie(''); }}></MainButton>}
      </div>
    </div>
    {/* <button type="submit">{editId ? 'Update' : 'Save'}</button> */}

    {/* {editId && <button type="button" onClick={() => { setEditId(null); setNumeMaterie(''); }}>Anulează</button>} */}
  </form>

  <div className='lista-materii'>
    <table className='wrapper generalPadding'>
      <thead>
        <tr>
          <th>Nume materie</th>
          <th>Optiuni</th>
        </tr>
      </thead>
      <tbody w>
        {materii.map((mat) => (
          <tr key={mat.id}>
            <td>{mat.nume_materie}</td>
            <td className='wrapperBtns'>
              <MainButton onClick={() => handleEdit(mat)} text="Edit"/>
              <MainButton onClick={() => handleDelete(mat.id)} text="Delete" />
              {/* <button onClick={() => handleEdit(mat)}>Edit</button>
              <button onClick={() => handleDelete(mat.id)}>Șterge</button> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};
