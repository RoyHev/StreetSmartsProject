import './newfooter.css'
import smalllogo from '../../Images/smalllogo.svg'
import React, {Component} from 'react';

class RightFooter extends Component{
    render(){
        return(
            <div className="rFooter">
                <div className="charitylogo" align="center"><a href="https://www.facebook.com"><img src={smalllogo} alt=""></img></a></div>
                <div className="charity" align="center">
                <span className="operatedby">מופעל ע"י עמותת</span>
                <span> </span>
                <span className="charityname">בית משלך</span>
                </div>
            </div>
        );
    }
}

export default RightFooter;