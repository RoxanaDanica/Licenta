import './styles/Orar.css';  
import { MainButton } from './MainButton';
import { ExportButton } from './ExportButton';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axios';
import * as XLSX from "xlsx";

const ore = ['08:00', '10:00', '12:00', '14:00', '16:00', '17:30', '20:00'];

function grupareOrar(orar) {
    const grupZiBazaLoc = {};

    orar.forEach(row => {
        const key = `${row.ziua}-${row.baza}-${row.locul}`;
        if (!grupZiBazaLoc[key]) {
            grupZiBazaLoc[key] = { 
                id: row.id,
                ziua: row.ziua,
                baza: row.baza,
                locul: row.locul,
                ore: {}
            };
        }
        grupZiBazaLoc[key].ore[row.ora] = [row.activitate, row.participanti, row.nr_max_locuri, row.id, row.ocupate];
    });
    return Object.values(grupZiBazaLoc); 
}


function RowOrar({ linie, ore, editMode, onEdit, ziNoua, onChangeProfesor, onChangeActivitate, onChangeNumarMaximLocuri, materiePreferata, user, onInscrieStudent, exportaStudentiExcel, onLanseazaPrezenta }) {


    const materiiVizibile = user?.role === 'administrator'
        ? materiePreferata
        : materiePreferata.filter(item => item.nume_profesor === user.username);

    return (
        <tr style={editMode && editMode !== linie.ziua ? { display: 'none' } : {}} className={`zi-${linie.ziua}`}>
            { ( user?.role === 'profesor' || user?.role === 'administrator' ) && (
                <td> 
                    {ziNoua && linie.ziua && (
                        <MainButton text={`Edit ${linie.ziua}`} onClick={() => onEdit(linie.ziua)} />
                    )}
                </td> )
            }
            <td>{linie.ziua}</td>
            <td>{linie.baza}</td>
            <td>{linie.locul}</td>
            {ore.map((ora, index) => {
                let valoare = linie.ore[ora] || ['', '', '', '', ''];

                const esteSlotDeProfesor = valoare[1] === user.username || valoare[1] === '';
                const poateModifica = user.role === 'administrator' || esteSlotDeProfesor;

                return ( 
                    <td className={valoare[0] !== '' || valoare[1] !== '' ? 'box' : ''} key={index}> 
                        {(editMode === linie.ziua && poateModifica) ? (
                            <> 
                                <select 
                                    value={linie.ore?.[ora]?.[0] ?? ''} 
                                    onChange={(e) => { 
                                        const materieSelectata = e.target.value; 
                                        const profesorGasit = materiiVizibile.find(item => item.nume_materie === materieSelectata)?.nume_profesor ?? ''; 
                                        onChangeActivitate(linie.id, linie.ziua, linie.baza, linie.locul, ora, materieSelectata); 
                                        onChangeProfesor(linie.id, linie.ziua, linie.baza, linie.locul, ora, profesorGasit);  
                                        const nrMaxExistenta = linie.ore?.[ora]?.[2];
                                        if (!nrMaxExistenta) {
                                            onChangeNumarMaximLocuri(linie.id, linie.ziua, linie.baza, linie.locul, ora, 50);
                                        } 
                                    }}>
                                    <option value="">Selectează materie...</option>
                                    {[...new Set(materiiVizibile.map(item => item.nume_materie))].map((materie, idx) => (
                                        <option key={idx} value={materie}>
                                            {materie}
                                        </option>
                                    ))}
                                </select> 
                                <br /> 
                                <input className='editModeInput'
                                    type="text" placeholder='Profesor'
                                    value={linie.ore?.[ora]?.[1] ?? ''}
                                    onChange={(e) => onChangeProfesor(linie.id, linie.ziua, linie.baza, linie.locul, ora, e.target.value)}
                                />
                                <input className='editModeInput' placeholder='Numar locuri' type='number' value={linie.ore?.[ora]?.[2] ?? ''} onChange={(e) => onChangeNumarMaximLocuri(linie.id, linie.ziua, linie.baza, linie.locul, ora, e.target.value)} />
                            </>
                        ) : (
                            <>
                                <div className='rowBox'>
                                    <div>
                                        <span>{valoare[0]}</span><br />
                                        <span>{valoare[1]}</span> 
                                    </div>
                                    {valoare[2] && (
                                        <span className="nrDisponibile" title="Numar maxim de locuri ocupate/disponibile"> Locuri: {valoare[4]}/{valoare[2]} </span>
                                    )}
                                </div>

                                {
                                    user?.role === 'student' && valoare[2] && ( 
                                    <button onClick={() => { onInscrieStudent(linie.ore?.[ora]?.[3]); console.log('linie id',linie.ore?.[ora]?.[3] ); }}>Inscrie-te</button>
                                    )
                                } 

                                { 
                                    user?.role === 'profesor' && valoare[4] > 0 && valoare[1] === user.username && (
                                        <>
                                             <ExportButton text={'Exporta studenti'} onClick={() => exportaStudentiExcel(linie.ore?.[ora]?.[3])} />
                                             <ExportButton style={{marginTop: '10px', marginBottom: '10px'}} text={'Lansează prezența'} onClick={() => onLanseazaPrezenta(valoare[3])} />
                                        </>
                                    )
                                }

                                {
                                    user?.role === 'administrator' && valoare[4] > 0 && (
                                        <>
                                            <ExportButton text={'Exporta studenti'} onClick={() => exportaStudentiExcel(linie.ore?.[ora]?.[3])} />
                                            <ExportButton style={{marginTop: '10px', marginBottom: '10px'}} text={'Lansează prezența'} onClick={() => onLanseazaPrezenta(valoare[3])} />
                                        </>
                                    )
                                }


                            </>
                        )}
                    </td>
                );
            })}
        </tr>
    );
}



/*
    grupuri = {
    "ziua": "LUNI",
    "baza": "Baza 1",
    "locul": "Sala",
    "ore": {
        "12:00": [
            "Fitness",
            "Gui",
            "50"
        ],
        "14:00": [
            "Fitness",
            "Gui",
            "50"
        ]
    }
}
*/

export function Orar({ orar, user, setOrar }) {
    const [ziEditata, setZiEditata] = useState(null);
    const [grupuri, setGrupuri] = useState([]);
    const [rows, setRows] = useState([]);
    const [materiePreferata, setMateriePreferata] = useState([]);
    const [editedInputs, setEditedInputs] = useState(new Set());
    const zileAfisate = new Set();

    // state pentru prezenta:
    const [prezentaModalOpen, setPrezentaModalOpen] = useState(false);
    const [listaStudentiPrezenta, setListaStudentiPrezenta] = useState([]);
    const [slotPrezentat, setSlotPrezentat] = useState(null);
    const [dataPrezenta, setDataPrezenta] = useState('');

    // grupare orar
    useEffect(() => {
        const orarGrupat = grupareOrar(orar);
        setGrupuri(orarGrupat);
    }, [orar]);

    // preluare profesori
    useEffect(() => {
        axiosInstance.get('/profesori').then(response => {
            setMateriePreferata(response.data);
        });
    }, []);

    // genereaza randuri tabel
    useEffect(() => {
        const liniiOrar = [];
        grupuri.forEach((linie, i) => {
            const ziNoua = !zileAfisate.has(linie.ziua);
            if (ziNoua) {
                zileAfisate.add(linie.ziua);
            }

            liniiOrar.push(
                <RowOrar key={`row-${i}`} 
                    onLanseazaPrezenta={onLanseazaPrezenta}
                    linie={linie}
                    ore={ore}
                    editMode={ziEditata}
                    ziNoua={ziNoua}
                    onEdit={editDay}
                    onChangeActivitate={editeazaActivitate}
                    onChangeProfesor={editeazaProfesor}
                    onChangeNumarMaximLocuri={editeazaNumarMaximLocuri}
                    materiePreferata={materiePreferata}
                    user={user}
                    onInscrieStudent={inscrieStudent}
                    exportaStudentiExcel={exportaStudentiExcel}
                />
            );

            if (!ziEditata && (i + 1) % 4 === 0 && i + 1 < grupuri.length) {
                liniiOrar.push(
                    <tr key={`spacer-${i}`}>
                        <td colSpan={ore.length + 4}></td>
                    </tr>
                );
            }
        });

        setRows(liniiOrar);
    }, [grupuri, ziEditata]);

    const onLanseazaPrezenta = (idSlot) => {
        setSlotPrezentat(idSlot);
        setPrezentaModalOpen(true);
        setDataPrezenta(''); 
        axiosInstance.get(`/studenti-inscrisi/${idSlot}`)
          .then(response => {
            const studenti = response.data.map(student => ({
              ...student,
              prezent: true 
            }));

            setListaStudentiPrezenta(studenti);
          })
          .catch(err => {
            console.error('Eroare la preluarea studenților:', err);
            alert('Eroare la preluarea studenților!');
          });
    };

    const handleSalvarePrezenta = () => {
        if (!dataPrezenta) {
            alert('Te rog să selectezi o dată pentru prezență!');
            return;
        }

        const prezentaFinala = listaStudentiPrezenta.map(student => ({
            id_student: student.id_student,
            id_slot: slotPrezentat,
            data_prezentei: dataPrezenta, 
            prezent: student.prezent
        }));

        axiosInstance.post('/prezenta/salvare', prezentaFinala)
            .then(response => {
                alert('Prezența a fost salvată!');
                setPrezentaModalOpen(false);
            })
            .catch(err => {
                console.error('Eroare la salvarea prezenței:', err);
                alert('Eroare la salvarea prezenței!');
            });
    };


    const exportaStudentiExcel = (id_slot, filename = `studenti${id_slot}.xlsx`) => {
        axiosInstance.get(`/studenti-inscrisi/${id_slot}`).then(response => {
            const studenti = response.data;
            const ws = XLSX.utils.json_to_sheet(studenti);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Studenti");
            XLSX.writeFile(wb, filename);
        }).catch(err => {
            console.error('Eroare export:', err);
        });
    };

    const inscrieStudent = (idSlot) => {
        const idStudent = user.id;
        axiosInstance.post('/inscriere', {
            id_student: idStudent,
            id_slot: idSlot
        }).then(response => {
            axiosInstance.get('/orar').then(response => {
                setOrar(response.data);
            });
        }).catch(err => {
            console.log('error: ', err);
        });
    };

    const editeazaProfesor = (id, ziua, baza, locul, ora, newProfesor) => {
        const newEditedInputs = new Set(editedInputs);
        newEditedInputs.add(id);
        setEditedInputs(newEditedInputs);
        const newGrupuri = [...grupuri];
        const grupEditat = newGrupuri.find(g => g.id === id);
        grupEditat.ore[ora] = [
            grupEditat.ore?.[ora]?.[0] ?? '',
            newProfesor,
            grupEditat.ore?.[ora]?.[2] ?? '',
            grupEditat.ore?.[ora]?.[3] ?? '',
            grupEditat.ore?.[ora]?.[4] ?? '',
            grupEditat.ore?.[ora]?.[5] ?? ''
        ];
        setGrupuri(newGrupuri);
    };

    const editeazaActivitate = (id, ziua, baza, locul, ora, newActivitata) => {
        const newEditedInputs = new Set(editedInputs);
        newEditedInputs.add(id);
        setEditedInputs(newEditedInputs);
        const newGrupuri = [...grupuri];
        const grupEditat = newGrupuri.find(g => g.id === id);
        grupEditat.ore[ora] = [
            newActivitata,
            grupEditat.ore?.[ora]?.[1] ?? '',
            grupEditat.ore?.[ora]?.[2] ?? '',
            grupEditat.ore?.[ora]?.[3] ?? '',
            grupEditat.ore?.[ora]?.[4] ?? '',
            grupEditat.ore?.[ora]?.[5] ?? ''
        ];
        setGrupuri(newGrupuri);
    };

    const editeazaNumarMaximLocuri = (id, ziua, baza, locul, ora, newNrMaxDisponibile) => {
        const newEditedInputs = new Set(editedInputs);
        newEditedInputs.add(id);
        setEditedInputs(newEditedInputs);
        const newGrupuri = [...grupuri];
        const grupEditat = newGrupuri.find(g => g.id === id);
        grupEditat.ore[ora] = [
            grupEditat.ore?.[ora]?.[0] ?? '',
            grupEditat.ore?.[ora]?.[1] ?? '',
            newNrMaxDisponibile,
            grupEditat.ore?.[ora]?.[3] ?? '',
            grupEditat.ore?.[ora]?.[4] ?? '',
            grupEditat.ore?.[ora]?.[5] ?? ''
        ];
        setGrupuri(newGrupuri);
    };

    const editDay = (zi) => {
        setZiEditata(zi);
    };

    const handleSave = async () => {
        const convertOrarToArray = [];

        editedInputs.forEach(id => {
            const grupGasit = grupuri.find(grup => grup.id === id);
            if (grupGasit) {
                const { ziua, baza, locul, ore } = grupGasit;
                for (const ora in ore) {
                    const [activitate, participanti, nr_max_locuri, id_slot] = ore[ora];
                    convertOrarToArray.push({
                        ziua,
                        baza,
                        locul,
                        activitate,
                        participanti,
                        nr_max_locuri,
                        id: id_slot ?? null,
                        ora
                    });
                }
            }
        });

        try {
            await axiosInstance.post('/save', { data: convertOrarToArray });
            const response = await axiosInstance.get('/orar');
            setOrar(response.data);
        } catch (error) {
            console.error('Eroare la salvare sau reîncărcare:', error);
        }

        setZiEditata(null);
    };

    const closeEditMode = () => {
        setZiEditata(null);
    };

    return (
        <>
            <div>
                <div>
                    <h3>Orar sem. I an universitar 2024 - 2025</h3>
                </div>

                <table className="generalPadding">
                    <thead>
                        <tr>
                            {user.role === 'profesor' && <th>Opțiuni</th>}
                            <th>Ziua</th>
                            <th>Baza</th>
                            <th>Locul</th>
                            {ore.map((ora, index) => (
                                <th key={index}>{ora}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>

                {ziEditata && (
                    <div className="wrapper wrapperBtnSave">
                        <MainButton text="Save" onClick={handleSave} />
                        <MainButton text="Back" onClick={closeEditMode} />
                    </div>
                )}

                {/* MODAL PREZENȚĂ */}
                {prezentaModalOpen && (
                <div className="prezentaModal">
                    <h3>Prezența pentru slot {slotPrezentat}</h3>

                    <label>
                        Selectează data prezenței:
                        <input
                            type="date"
                            value={dataPrezenta}
                            onChange={(e) => setDataPrezenta(e.target.value)}
                        />
                    </label>

                    <ul>
                        {listaStudentiPrezenta.map((student, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={student.prezent}
                                        onChange={() => {
                                            const newLista = [...listaStudentiPrezenta];
                                            newLista[index].prezent = !newLista[index].prezent;
                                            setListaStudentiPrezenta(newLista);
                                        }}
                                    />
                                    {student.nume} {student.email ? `(${student.email})` : ''}
                                </label>
                            </li> 
                        ))}
                    </ul>

                    <button onClick={handleSalvarePrezenta}>Salvează prezența</button>
                    <button onClick={() => setPrezentaModalOpen(false)}>Anulează</button>
                </div>
            )}
            </div>
        </>
    );
}

