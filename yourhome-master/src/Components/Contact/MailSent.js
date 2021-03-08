import React, {Component} from 'react'
import './contact.css'
import mailSent from '../../Images/mailSent.svg';

class MailSent extends Component {
    render(){
        return(
            <div className="mailSentPage" align="center">
                <div className="mailSentImage">
                <img src={mailSent}/>
                </div>
                <div className="mailSentThankYou" dir="rtl">תודה על פנייתך</div>
                <div className="mailSentMessage1" dir="rtl">קיבלנו את פנייתך וניצור</div>
                <div className="mailSentMessage2" dir="rtl">איתך קשר בהקדם.</div>
                <div className="go-to-homepage"><a href="/">חזור אל דף הבית</a></div>
                </div>
        );
    }
}

export default MailSent;