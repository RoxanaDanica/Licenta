import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axios';

export const ManageMateriiPage = () => {
    const [numeMaterie, setNumeMaterie] = useState('');
    const [materii, setMaterii] = useState([]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const newMaterii = [...materii, numeMaterie];
      setMaterii(newMaterii);
      setNumeMaterie('');
    };
    /* TO DO: ADD MATERII DELETE MATERII AND UPDATE */
    useEffect(() => {
        axiosInstance.get('/materii').then(response => {
            setMaterii(response.data);
        });
    }, []);

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
            <button type="submit">Save</button>
        </form>
      
        <div className='lista-materii'>
            <ul>
              {materii.map((mat, index) => (
                <li key={index}>{mat.nume_materie}</li>
              ))}
            </ul>
        </div>
    </div>
  );
};

