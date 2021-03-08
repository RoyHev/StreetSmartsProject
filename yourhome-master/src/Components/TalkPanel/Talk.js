import React, {Component} from 'react'
import './talking.css'
import {withRouter} from 'react-router-dom'

class TalkPanel extends Component{
    handleClick = () => {
        this.props.history.push('./hotlines')
    }
    render(){
        return(
            <div align="center" className="talking">
                <div className="letstalk">אפשר גם לדבר</div>
                <button className="talkbutton" onClick={this.handleClick}>לרשימת מספרי המצוקה</button>

            </div>
        );
    }
}

export default withRouter(TalkPanel);