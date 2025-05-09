import './styles/Orar.css';  
import { MainButton } from './MainButton';
import { useEffect, useState } from 'react';

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
        grupZiBazaLoc[key].ore[row.ora] = [row.activitate, row.participanti];
    });
    return Object.values(grupZiBazaLoc);
}

function RowOrar({ linie, ore, editMode, onEdit, ziNoua, onChangeProfesor, onChangeActivitate }) {
    return (
        <tr style={editMode && editMode !== linie.ziua ? { display: 'none' } : {}} className={`zi-${linie.ziua}`}>
            <td>
                {ziNoua && linie.ziua && <MainButton text={`Edit ${linie.ziua}`} onClick={() => onEdit(linie.ziua)} />}
            </td>
            <td>{linie.ziua}</td>
            <td>{linie.baza}</td>
            <td>{linie.locul}</td>
            {ore.map((ora, index) => {
                let valoare = linie.ore[ora] || ['', ''];

                return ( 
                    <td key={index}>
                        {/* {!(editMode === linie.ziua) ? ( */}
                        {editMode === linie.ziua ? (
                            <> 
                                <input
                                    type="text"
                                    value={linie.ore?.[ora]?.[0] ?? ''}
                                    onChange={(e) => onChangeActivitate(linie.id, linie.ziua, linie.baza, linie.locul, ora, e.target.value)}
                                /><br />
                                <input
                                    type="text"
                                    value={linie.ore?.[ora]?.[1] ?? ''}
                                    onChange={(e) => onChangeProfesor(linie.id, linie.ziua, linie.baza, linie.locul, ora, e.target.value)}
                                />
                            </>
                        ) : (
                            <>
                                <span>{valoare[0]}</span><br />
                                <span>{valoare[1]}</span> 
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
            "Gui"
        ],
        "14:00": [
            "Fitness",
            "Gui"
        ]
    }
}
*/

export function Orar({ orar }) {
    const [ziEditata, setZiEditata] = useState(null);
    const [grupuri, setGrupuri] = useState([]);
    const [rows, setRows] = useState([]);
    const zileAfisate = new Set();
    const idEditat = new Set();

    useEffect(() => {
        console.log('grupuri===>', grupuri);
    }, [grupuri]);


    useEffect(() => {
        const orarGrupat = grupareOrar(orar);
        setGrupuri(orarGrupat);
    }, [orar]);
    

    useEffect(() => {
        const liniiOrar = [];
        grupuri.forEach((linie, i) => {
            const ziNoua = !zileAfisate.has(linie.ziua);
            if (ziNoua) {
                zileAfisate.add(linie.ziua);
            }

            liniiOrar.push(
                <RowOrar key={`row-${i}`} linie={linie} ore={ore} editMode={ziEditata} ziNoua={ziNoua} onEdit={editDay/* !!! */} onChangeActivitate={editeazaActivitate} onChangeProfesor={editeazaProfesor} />
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


    // o sa modifice variabila grupuri
    const editeazaProfesor = (id,ziua, baza, locul, ora, newProfesor) => {
        idEditat.add(id);
        const newGrupuri = [...grupuri];
        const grupEditat = newGrupuri.find(g => g.id === id);
        grupEditat.ore[ora] = [grupEditat.ore?.[ora]?.[0] ?? '', newProfesor];
        setGrupuri(newGrupuri);
    }

    const editeazaActivitate = (id,ziua, baza, locul, ora, newActivitata) => {
        idEditat.add(id);
        const newGrupuri = [...grupuri];
        const grupEditat = newGrupuri.find(g => g.id === id);
        grupEditat.ore[ora] = [newActivitata, grupEditat.ore?.[ora]?.[1] ?? ''];
        setGrupuri(newGrupuri);
    } 

    const editDay = (zi) => {
        setZiEditata(zi);
    };

    const handleSave = () => {
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
                        <th>Opțiuni</th>
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
                <div className="wrapperBtnSave">
                    <MainButton text="Save" onClick={() => handleSave()} />
                </div>
            )}

        </>
    );
}
