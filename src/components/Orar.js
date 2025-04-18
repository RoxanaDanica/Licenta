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

    const rows = Object.values(grupZiBazaLoc).map((linie, index) => (
         <tr key={index}>
            <td>{linie.ziua}</td>
            <td>{linie.baza}</td>
            <td>{linie.locul}</td> 
            {ore.map((ora, index) => (
                <td key={index}>{linie.ore[ora] || ''}</td>
            ))}
        </tr>
    ))
    console.log(grupZiBazaLoc);

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