import './styles/Orar.css';  
import { MainButton } from './MainButton';
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

function RowOrar({ linie, ore, editMode, onEdit, ziNoua, onChangeProfesor, onChangeActivitate,onChangeNumarMaximLocuri, materiePreferata, user, onInscrieStudent }) {
    return (
        <tr style={editMode && editMode !== linie.ziua ? { display: 'none' } : {}} className={`zi-${linie.ziua}`}>
            {/* <td>
                {ziNoua && linie.ziua && <MainButton text={`Edit ${linie.ziua}`} onClick={() => onEdit(linie.ziua)} />}
            </td> */}
            { user?.role === 'profesor' && (
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
                let valoare = linie.ore[ora] || ['', ''];

                return ( 
                    <td key={index}>
                        {editMode === linie.ziua ? (
                            <> 
                                <select value={linie.ore?.[ora]?.[0] ?? ''} onChange={(e) => { const materieSelectata = e.target.value; const profesorGasit = materiePreferata.find(item => item.nume_materie === materieSelectata)?.nume_profesor ?? ''; onChangeActivitate(linie.id, linie.ziua, linie.baza, linie.locul, ora, materieSelectata); onChangeProfesor(linie.id, linie.ziua, linie.baza, linie.locul, ora, profesorGasit);  const nrMaxExistenta = linie.ore?.[ora]?.[2];
                                    if (!nrMaxExistenta) {
                                    onChangeNumarMaximLocuri(linie.id, linie.ziua, linie.baza, linie.locul, ora, 50);
                                    } }}>
                                    <option value="">Selectează materie...</option>
                                    {[...new Set(materiePreferata.map(item => item.nume_materie))].map((materie, index) => (
                                        <option key={index} value={materie}>
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
                                <span>{valoare[0]}</span><br />
                                <span>{valoare[1]}</span> <br/>
                                {valoare[2] && (
                                    <span className="nrDisponibile" title="Numar maxim de locuri ocupate/disponibile"> Locuri: {valoare[4]}/{valoare[2]} </span>
                                )}

                                {
                                    user?.role === 'student' && valoare[2] && ( 
                                    <button onClick={() => { onInscrieStudent(linie.ore?.[ora]?.[3]); console.log('linie id',linie.ore?.[ora]?.[3] ); }}>Inscrie-te</button>
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

    useEffect(() => {
        // console.log('grupuri===>', grupuri);
    }, [grupuri]);


    useEffect(() => {
        const orarGrupat = grupareOrar(orar);
        setGrupuri(orarGrupat);
        console.log(orarGrupat);
    }, [orar]);

    useEffect(() => {
        axiosInstance.get('/profesori').then(response => {
            setMateriePreferata(response.data);
        });
    }, []);

    useEffect(() => {
        const liniiOrar = [];
        grupuri.forEach((linie, i) => {
            const ziNoua = !zileAfisate.has(linie.ziua);
            if (ziNoua) {
                zileAfisate.add(linie.ziua);
            }

            liniiOrar.push(
                <RowOrar key={`row-${i}`} linie={linie} ore={ore} editMode={ziEditata} ziNoua={ziNoua} onEdit={editDay/* !!! */} onChangeActivitate={editeazaActivitate} onChangeProfesor={editeazaProfesor} onChangeNumarMaximLocuri={editeazaNumarMaximLocuri} materiePreferata={materiePreferata} user={user} onInscrieStudent={inscrieStudent} />
            );

            // add empty line
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

    const inscrieStudent = (idSlot) => {
        const idStudent =  user.id //luat din loocalStoager
        axiosInstance.post('/inscriere', {
            id_student:idStudent,
            id_slot: idSlot
        }).then(response => {
            console.log('response: ', response);
            axiosInstance.get('/orar').then(response => {
                setOrar(response.data);
            });
        }).catch(err => {
            console.log('error: ', err);
        })
    } 

    // o sa modifice variabila grupuri
    const editeazaProfesor = (id,ziua, baza, locul, ora, newProfesor) => {
        const newEditedInputs = new Set(editedInputs);
        newEditedInputs.add(id);
        setEditedInputs(newEditedInputs); 
        const newGrupuri = [...grupuri];
        const grupEditat = newGrupuri.find(g => g.id === id);
        grupEditat.ore[ora] = [grupEditat.ore?.[ora]?.[0] ?? '', newProfesor, grupEditat.ore?.[ora]?.[2] ?? ''];
        setGrupuri(newGrupuri);
    }

    const editeazaActivitate = (id,ziua, baza, locul, ora, newActivitata) => {
        const newEditedInputs = new Set(editedInputs);
        newEditedInputs.add(id);
        setEditedInputs(newEditedInputs);
        const newGrupuri = [...grupuri];
        const grupEditat = newGrupuri.find(g => g.id === id);
        grupEditat.ore[ora] = [newActivitata, grupEditat.ore?.[ora]?.[1] ?? '',grupEditat.ore?.[ora]?.[2] ?? ''];
        setGrupuri(newGrupuri);
    } 
    const editeazaNumarMaximLocuri = (id,ziua, baza, locul, ora, newNrMaxDisponibile) => {
        const newEditedInputs = new Set(editedInputs);
        newEditedInputs.add(id);
        setEditedInputs(newEditedInputs);
        const newGrupuri = [...grupuri];
        const grupEditat = newGrupuri.find(g => g.id === id);
        grupEditat.ore[ora] = [grupEditat.ore?.[ora]?.[0] ?? '', grupEditat.ore?.[ora]?.[1] ?? '',newNrMaxDisponibile];
        setGrupuri(newGrupuri);
    } 

    const editDay = (zi) => {
        setZiEditata(zi);
    };

    const handleSave = () => {
        const convertOrarToArray = [];
        editedInputs.forEach(id => {
            const grupGasit = grupuri.find(grup => grup.id === id); 
            if (grupGasit) {
                const { ziua, baza, locul, ore } = grupGasit;
                for (const ora in ore) {
                    const [activitate, participanti, nr_max_locuri] = ore[ora];
                    convertOrarToArray.push({
                        ziua, 
                        baza,
                        locul,
                        activitate,
                        participanti,
                        nr_max_locuri,
                        ora
                    }); 
                }
            }
        }); 

        axiosInstance.post('/save', { data: convertOrarToArray }).then(response => {
            // console.log('save response: ', response);
        }); 
        setZiEditata(null);
    };
    
    const closeEditMode = () => {
        setZiEditata(null);  
    };
    
     


    return (
        <>
            <div className="wrapper">
                <h3>Orar sem. I an universitar 2024 - 2025</h3>
            </div>
            <table className="generalPadding wrapper">
                <thead>
                    <tr>
                        {/* <th>Opțiuni</th> */}
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
                    <MainButton text="Save" onClick={() => handleSave()} />
                    <MainButton text="Back" onClick={() => closeEditMode()}/>
                </div>
            )}

        </>
    );
}
