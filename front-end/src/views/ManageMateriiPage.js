import React, { useState } from 'react';

const materiiInitial = ['Fitness', 'Inot', 'Fotbal Feminin'];

export const ManageMateriiPage = () => {
    const [numeMaterie, setNumeMaterie] = useState('');
    const [materii, setMaterii] = useState(materiiInitial);

    const handleSubmit = (e) => {
      e.preventDefault();
      const newMaterii = [...materii, numeMaterie];
      setMaterii(newMaterii);
      setNumeMaterie('');
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
            <button type="submit">Save</button>
        </form>
      
        <div className='lista-materii'>
            <ul>
                {materii.map(mat => <li>{mat}</li>)}
            </ul>
        </div>
    </div>
  );
};

