
export function MainButton({text, onClick})
{
    return (
        <>
            <a className="mainButton" onClick={onClick} >{text}</a>
        </>
    )
}