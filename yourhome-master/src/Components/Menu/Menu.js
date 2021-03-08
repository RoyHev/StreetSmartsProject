import React, { Component } from 'react'
import { menuData } from './menu-data'
import './MenuStyle.css'
class Menu extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isMenuOpen: false
        }
        this.menuClickHandler = this.menuClickHandler.bind(this)
    }
    
    menuClickHandler = () =>{
        this.setState({isMenuOpen: !this.state.isMenuOpen})
    };

    render() {
        const {isMenuOpen} = this.state
        return (
            <div className="container">
                <div className="menu-button">
                    <i  onClick={this.menuClickHandler} class="fas fa-bars"></i>
                </div>
                {/* Sidebar */}
                {menuData.length && (
                    <nav className={`nav ${isMenuOpen ? 'show' : ''}`}>
                        <div onClick={this.menuClickHandler} 
                        className="close"><i class="far fa-window-close"></i>
                        </div>
                        <ul className="menu-items">
                            {menuData.map(item => (
                                <li className="menu-list" key={item.label}>
                                    <a className="menu-link" href={item.url}>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        )
    }
}

export default Menu
