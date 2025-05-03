import './styles/Orar.css';  

export function Orar({ orar }) {
    const ore = ['08:00', '10:00', '12:00', '14:00', '16:00', '17:30', '20:00'];
    const grupZiBazaLoc = {}; 

    orar.forEach(row => {

        const key = `${row.ziua}-${row.baza}-${row.locul}`;
        if (!grupZiBazaLoc[key]) {
            grupZiBazaLoc[key] = {
                ziua: row.ziua,
                baza: row.baza,
                locul: row.locul,
                ore: {}
            };
        }
        grupZiBazaLoc[key].ore[row.ora] = [row.activitate, row.participanti];  
    }); 
    
    const grupuri = Object.values(grupZiBazaLoc); 
    const rows = [];

    for (let i = 0; i < grupuri.length; i++) {
        const linie = grupuri[i];

        rows.push(
            <tr key={`row-${i}`}>
                <td>{linie.ziua}</td>
                <td>{linie.baza}</td>
                <td>{linie.locul}</td>
                {ore.map((ora, index) => (
                    <td key={index}>
                        {linie.ore[ora] ? ( 
                            <>
                                {linie.ore[ora][0]}<br />{linie.ore[ora][1]}
                            </>
                        ) : ''}
                    </td>
                ))}
            </tr>
        );

        if ((i + 1) % 4 === 0 && i + 1 < grupuri.length) {
            rows.push(
                <tr key={`spacer-${i}`}>
                    <td colSpan={ore.length + 3}></td>
                </tr> 
            );
        }
    }

    return (
        <>
            <div className="wrapper">
                <h3>Orar sem. I an universitar 2024 - 2025</h3>
            </div> 
            <table className="generalPadding wrapper">
                <thead> 
                    <tr>
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
        </>
    ); 
}   