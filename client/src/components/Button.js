import React from 'react'

function Button({ title, onClick, variant, disabled, fullWidth, type }) {

    let className = 'bg-secondary p-1 text-white br-2';
    if (fullWidth) {
        className += ' w-full';
    }

    if (variant === "outlined") {
        className = className.replace('bg-secondary', 'border border-primary text-black bg-white')
    } else if (variant === "white") {
        className = className.replace('bg-secondary', 'border border-secondary bg-white text-black')
    }

    return (
        <button className={className} type={type} onClick={onClick} disabled={disabled}>
            { title }
        </button>
    )
}

export default Button