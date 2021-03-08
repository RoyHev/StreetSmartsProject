import React, {Component} from 'react'
import RightFooter from './RightFooter'
import LeftFooter from './LeftFooter'
import './newfooter.css'

class NewFooter extends Component{
    render(){
        return(
            <div className="newfooter">
            <div className="leftfoot">
            <LeftFooter></LeftFooter>
            </div>
            <div className="rightfoot">
            <RightFooter></RightFooter></div>
            </div>

        );
    }
}

export default NewFooter;