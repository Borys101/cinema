import React from 'react'

function Button({ title, onClick, variant, disabled, fullWidth, type }) {

<<<<<<< HEAD
    let className = 'bg-primary p-1 text-white';
=======
    let className = 'bg-secondary p-1 text-white br-2';
>>>>>>> my-recovered-branch
    if (fullWidth) {
        className += ' w-full';
    }

    if (variant === "outlined") {
<<<<<<< HEAD
        className = className.replace('bg-primary', 'border border-primary text-primary bg-white')
=======
        className = className.replace('bg-secondary', 'border border-primary text-black bg-white')
    } else if (variant === "white") {
        className = className.replace('bg-secondary', 'border border-secondary bg-white text-black')
>>>>>>> my-recovered-branch
    }

    return (
        <button className={className} type={type} onClick={onClick} disabled={disabled}>
            { title }
        </button>
    )
}

export default Button