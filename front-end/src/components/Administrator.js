import React, { useState } from 'react';
import './styles/Orar.css';  

const Administrator = () => {
  const [activitati, setActivitati] = useState([
    { materie: "Fitness", profesor: "Gui" },
    { materie: "Jogging", profesor: "Alexandru" },
    { materie: "Jogging", profesor: "Sărăndan" },
    { materie: "Baschet 3X3", profesor: "Ionescu" },
    { materie: "Fotbal", profesor: "Molcuț" },
    { materie: "Fotbal", profesor: "Szabo" },
    { materie: "Culturism", profesor: "Alexandru" },
    { materie: "Culturism", profesor: "Sărăndan" },
    { materie: "Jogging", profesor: "Alexandru" },
    { materie: "Jogging", profesor: "Ionescu" },
    { materie: "Aerobic", profesor: "Varga" },
    { materie: "Cerc volei", profesor: "Varga" },
    { materie: "Fotbal", profesor: "Molcuț" },
    { materie: "Fotbal", profesor: "Datcu" },
    { materie: "Fitness", profesor: "Gui" },
    { materie: "Jogging", profesor: "Gui" },
    { materie: "Jogging", profesor: "Alexandru" },
    { materie: "Aerobic", profesor: "Varga" },
    { materie: "Fotbal", profesor: "Molcuț" },
    { materie: "Fotbal", profesor: "Szabo" },
    { materie: "Fitness", profesor: "Gui" },
    { materie: "Jogging", profesor: "Sărăndan" },
    { materie: "Jogging", profesor: "Alexandru" },
    { materie: "Aerobic", profesor: "Varga" },
    { materie: "Baschet 3X3", profesor: "Ionescu" },
    { materie: "Fotbal feminin", profesor: "Szabo" },
    { materie: "Fotbal feminin", profesor: "Datcu" },
    { materie: "Culturism", profesor: "Sărăndan" },
    { materie: "Fitness", profesor: "Chirilă M" },
    { materie: "Jogging", profesor: "Ciorsac" },
    { materie: "Jogging", profesor: "Ionescu" },
    { materie: "Aerobic", profesor: "Varga" },
    { materie: "Cerc volei", profesor: "Varga" }
  ]);

  const [newActivitate, setNewActivitate] = useState({ materie: '', profesor: '' });
  const [editingId, setEditingId] = useState(null);

  const handleAddActivitate = () => {
    const newItem = { id: Date.now(), materie: newActivitate.materie, profesor: newActivitate.profesor };
    setActivitati([...activitati, newItem]);
    setNewActivitate({ materie: '', profesor: '' });
  };

  const handleEditActivitate = (id) => {
    const activitateToEdit = activitati.find(item => item.id === id);
    setNewActivitate({ materie: activitateToEdit.materie, profesor: activitateToEdit.profesor });
    setEditingId(id);
  };

  
  const handleSaveEdit = () => {
    setActivitati(activitati.map(item => item.id === editingId ? { ...item, ...newActivitate } : item));
    setNewActivitate({ materie: '', profesor: '' });
    setEditingId(null);
  };

  
  const handleDeleteActivitate = (id) => {
    setActivitati(activitati.filter(item => item.id !== id));
  };

  return (
    <div className='generalPadding wrapper'>
      <h2>Administrator Activități</h2>

      <div>
        <input
          type="text"
          placeholder="Materie"
          value={newActivitate.materie}
          onChange={(e) => setNewActivitate({ ...newActivitate, materie: e.target.value })}
        />
        <input
          type="text"
          placeholder="Profesor"
          value={newActivitate.profesor}
          onChange={(e) => setNewActivitate({ ...newActivitate, profesor: e.target.value })}
        />
        {editingId ? (
          <button onClick={handleSaveEdit}>Salvează Modificările</button>
        ) : (
          <button onClick={handleAddActivitate}>Adaugă Activitate</button>
        )}
      </div>

      <h3>Lista Activităților</h3>
      <ul>
        {activitati.map(item => (
          <li key={item.id}>
            <strong>{item.materie}</strong> - {item.profesor}
            <button onClick={() => handleEditActivitate(item.id)}>Editează</button>
            <button onClick={() => handleDeleteActivitate(item.id)}>Șterge</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Administrator;
