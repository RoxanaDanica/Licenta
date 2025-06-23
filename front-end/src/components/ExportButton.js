
export function ExportButton({text, onClick, style})
{
    return (
        <>
            <button className="exportButton" style={style} onClick={onClick} >{text}</button>
        </>
    )
}