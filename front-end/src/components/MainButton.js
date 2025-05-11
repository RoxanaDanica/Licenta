
export function MainButton({text, onClick})
{
    return (
        <>
            <button className="mainButton" onClick={onClick} >{text}</button>
        </>
    )
}