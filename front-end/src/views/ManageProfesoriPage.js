import React, { useState } from 'react';

const profesoriInitial = ['Gui', 'Ciorsac', 'Varga'];

export const ManageProfesoriPage = () => {
    const [name, setName] = useState('');
    const [materie, setMaterie] = useState('');
    const [profesori, setProfesori] = useState(profesoriInitial);

    const handleSubmit = (e) => {
      e.preventDefault();
      const newProfi = [...profesori, name];
      setProfesori(newProfi);
      setName('');
    };

  return (
    <div>
        <h1>Manage Profesori</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlFor="name">Name</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <br></br>
            <label htmlFor="materie-preferata">Materie Preferata</label>
            <input
                type="text"
                id="materie-preferata"
                value={materie}
                onChange={(e) => setMaterie(e.target.value)}
                required
            />
            </div>
            <button type="submit">Save</button>
        </form>
      
        <div className='lista-profesori'>
            <ul>
                {profesori.map(prof => <li>{prof}</li>)}
            </ul>
        </div>
    </div>
  );
};

