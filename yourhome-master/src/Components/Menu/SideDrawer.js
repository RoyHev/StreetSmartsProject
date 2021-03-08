import React from 'react'
import './SideDrawer.css'
import { Link } from 'react-router-dom';
import { auth } from '../../Firebase/index.js'


export default class SideDrawer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showAdmin: false,
            showNonAdmin: false,
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user){
                this.setState({
                    showAdmin: true,
                    showNonAdmin: false,
                })
            } else {
                this.setState({
                    showNonAdmin: true,
                    showAdmin: false,
                })
            }
        })
    }
    handleSignOut = () => {
        auth.signOut()
        this.props.drawerClickHandler()
    }

    render (){
        let drawerClasses = 'side-drawer';
        if (this.props.show){
            drawerClasses = 'side-drawer open'
        }
        var nonAdminDisplay = 
        <div dir="rtl">
            <nav className={drawerClasses}>
                <ul>
                    <Link to=".././">
                    <li className="menu-item" onClick={this.props.drawerClickHandler}>
                        דף הבית
                    </li>
                    </Link>
                    <Link to=".././hotlines">
                    <li className="menu-item" onClick={this.props.drawerClickHandler}>
                        מספרי מצוקה
                    </li>
                    </Link>
                    <Link to=".././contact-us">
                    <li className="menu-item" onClick={this.props.drawerClickHandler}>
                        צור קשר
                    </li>
                    </Link>
                    <Link to=".././admin-login">
                    <li className="menu-item" onClick={this.props.drawerClickHandler}>
                        כניסת אדמין
                    </li>
                    </Link>
                </ul>
            </nav>
        </div>
        var adminDisplay = 
        <div dir="rtl">
            <nav className={drawerClasses}>
                <ul>
                    <Link to=".././">
                    <li className="menu-item" onClick={this.props.drawerClickHandler}>
                        דף הבית
                    </li>
                    </Link>
                    <Link to=".././admin">
                    <li className="menu-item" onClick={this.props.drawerClickHandler}>
                        דף בית אדמין
                    </li>
                    </Link>
                    <Link to=".././add-new-admin">
                    <li className="menu-item" onClick={this.props.drawerClickHandler}>
                        הוסף אדמין חדש
                    </li>
                    </Link>
                    <Link to=".././add-new-place">
                    <li className="menu-item" onClick={this.props.drawerClickHandler}>
                        הוסף מידע חדש
                    </li>
                    </Link>
                    <Link to=".././hotlines-admin">
                    <li className="menu-item" onClick={this.props.drawerClickHandler}>
                        מספרי מצוקה
                    </li>
                    </Link>
                    <Link to=".././">
                    <li className="menu-item" onClick={this.handleSignOut}>
                        התנתקות אדמין
                    </li>
                    </Link>
                </ul>
            </nav>
        </div>
        return (
            <div>
                {this.state.showAdmin && adminDisplay}
                {this.state.showNonAdmin && nonAdminDisplay}
            </div>
        );
    }
}
