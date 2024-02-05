export default function Button({text, classNames}) {

    return (
        <button className={`btn btn-primary ${classNames}`}>
            {text}
        </button>
    )
}