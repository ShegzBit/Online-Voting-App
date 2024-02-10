export default function Button({text, classNames, cb}) {

    return (
        <button onClick={cb} className={`btn btn-gradient btn-primary ${classNames}`}>
            {text}
        </button>
    )
}
