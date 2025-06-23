import React, { useState } from 'react';
import axios from 'axios';

const PrezentaProfesor = ({ profesor }) => {
  const [idSlot, setIdSlot] = useState('');
  const [data, setData] = useState('');

  const lanseazaPrezenta = async () => {
    try {
      await axios.post('/prezenta/lansare', {
        id_slot: idSlot,
        data: data,
      });
      alert('Prezența a fost lansată cu succes!');
    } catch (err) {
      alert('Eroare la lansarea prezenței!');
    }
  };

  return (
    <div>
      <h2>Lansează prezență</h2>
      <input type="text" placeholder="ID Slot" value={idSlot} onChange={e => setIdSlot(e.target.value)} />
      <input type="date" value={data} onChange={e => setData(e.target.value)} />
      <button onClick={lanseazaPrezenta}>Lansează prezență</button>
    </div>
  );
};

export default PrezentaProfesor;
