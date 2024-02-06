export default function Button({text, classNames}) {

    return (
        <button className={`btn btn-gradient btn-primary ${classNames}`}>
            {text}
        </button>
    )
}
