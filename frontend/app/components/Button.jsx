'use client'


export default function Button({text, classNames, cb, disabled}) {

    return (
        <button disabled={disabled} onClick={cb} className={`btn btn-gradient btn-primary ${classNames}`}>
            {text}
        </button>
    )
}
