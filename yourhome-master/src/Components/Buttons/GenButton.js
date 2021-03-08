import React from 'react'
import './genbutton.css'

const STYLES = [
    "btn--primary--solid",
    "btn--warning--solid",
    "btn--success--solid",
    "btn--accept--solid",
    "btn--mailSend--solid",
    "btn--add--solid",
];

const SIZES = ["btn--medium", "btn--small", "btn--send", "btn--add"];


export const GenButton = ({
    children,
    type,
    onClick, 
    buttonStyle, 
    buttonSize,
    buttonState,
}) => {

const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]

const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return (
        <button dir='rtl' className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type} disabled={buttonState}>
            {children}
        </button>
    );
};

export default GenButton;