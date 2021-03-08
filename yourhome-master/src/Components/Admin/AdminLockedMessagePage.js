import React from 'react'
import './adminlocked.css'
import logo100px from '../../Images/logo100px.svg'
import {Redirect} from 'react-router'

export default class AdminLockedMessagePage extends React.Component{
    constructor(){
        super()
        this.state = {
            redirect: false,
        }

    }
    render(){
        if (this.state.redirect){
            return <Redirect push to="/" />
        }
        return(
            <div className="paddingForFooter">
            <div align="center" className="mainLockedPage">
                <div className="content">
                    <img className="lockedLogo" src={logo100px}/>
                    <div className="lockedTitle" dir='rtl'>נדרשת הרשאת אדמין</div>
                    <div className="lockedMessage" dir='rtl'>אינך מופיע כאדמין רשום במערכת</div>
                    <button className="homePageButton" onClick={()=> {this.setState({redirect:true})}}>חזור לדף הבית</button>
                </div>
            </div>
            </div>
        );
    }

}