import React from 'react'
import './HamburgerButton.css'
import menu from '../../Images/menu.svg'

const HamburgerButton = props => {
    return (
        <div>
                <img className="hamburgerSVG" src={menu} onClick={props.click}/>
        </div>
    )
}

export default HamburgerButton
