import newMailFooter from '../../Images/FooterIcons/footer-email.svg'
import newFacebookFooter from '../../Images/FooterIcons/footer-facebook.svg'


import './newfooter.css'
import React, {Component} from 'react';


class LeftFooter extends Component {
    render(){
        return(
            <div align="right">
                <div className="street" dir="rtl">הארזים 9</div>
                <div className="city" dir="rtl">חיפה, 2628209</div>
                <div className="phone">0526975748</div>
                <div className="icons">
                <span className="facebookicon">
                <a href = "https://www.facebook.com/"><img className="iconsvg" src={newFacebookFooter}/></a>
                </span>
                <span className="mailicon">
                <a href="mailto:darey.rehov@gmail.com"><img className="iconsvg" src={newMailFooter}/></a>
                </span>
                </div>
            </div>

        );
    }
}
export default LeftFooter;