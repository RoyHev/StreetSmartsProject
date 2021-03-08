import React from 'react'
import './Toolbar.css'
import '../Buttons/HamburgerButton.js'
import HamburgerButton from '../Buttons/HamburgerButton.js'
import smallbrainlogo from '../../Images/smallbrainlogo.svg'


const Toolbar = props => {    
    return (
        <div dir="rtl" className="toolbar">
            <nav className="toolbar_nav">
                <div>
                    <HamburgerButton click={props.drawerClickHandler}/>
                </div>
                <div className="spacer"/>

                <div className="toolbar_logo">
                    <a href="/">
                        <img src={smallbrainlogo}/>
                    </a>
                </div>
                <div className="spacer"/>
                <div className="toolbar_nav_items">
                    <ul>
                        <li>
                            {/* use react routing */}
                            {/* <a href="/">AAA</a> */}
                        </li>
                        <li>
                        {/* <a href="/">BBB</a> */}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Toolbar
