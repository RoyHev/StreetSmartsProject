import React from 'react'
import "./MyButton.css"

const STYLES = [
    "mybtn--primary--solid",
    "mybtn--warning--solid",
    "mybtn--danger--solid",
    "mybtn--success--solid",
    "mybtn--primary--outline",
    "mybtn--clothing--solid",
    "mybtn--food--solid",
    "mybtn--employment--solid",
    "mybtn--lodging--solid",
    "mybtn--aid--solid",
    "mybtn--reset--solid",
    "mybtn--rehab--solid",
    "mybtn--violence--solid",
]

const SIZES = [
    "mybtn--medium",
    "mybtn--small", 
]


function MyButton(props) {
    const checkButtonStyle = STYLES.includes(props.buttonStyle) ? props.buttonStyle : STYLES[0]
    const checkButtonSize = SIZES.includes(props.buttonSize) ? props.buttonSize : SIZES[0]

    return (
        <div>
            <button
                className={`mybtn ${checkButtonStyle} ${checkButtonSize}`}
                type={props.type}
                onClick={() => props.clickHandler(props.buttonName)}>
                {props.children}
            </button>
        </div>
    )
}

export default MyButton