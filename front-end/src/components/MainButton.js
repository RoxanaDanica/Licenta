
export function MainButton({text, onClick, style})
{
    return (
        <>
            <button className="mainButton" style={style} onClick={onClick} >{text}</button>
        </>
    )
}