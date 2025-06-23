import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PrezentaStudent = ({ student }) => {
  const [prezente, setPrezente] = useState([]);

  useEffect(() => {
    axios.get(`/prezenta/student/${student.id}`).then(res => {
      setPrezente(res.data);
    });
  }, [student.id]);

  return (
    <div>
      <h2>Prezențele mele</h2>
      <ul>
        {prezente.map((p, idx) => (
          <li key={idx}>
            {p.data_prezentei} | Materie: {p.materie} | Locație: {p.loc} | Profesor: {p.profesor}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrezentaStudent;
