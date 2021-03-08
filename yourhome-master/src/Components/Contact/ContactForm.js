import React from 'react';
import {useState} from 'react';
import {Axios, db} from '../../Firebase/'
import './contact.css'
import mailLogo from '../../Images/mailLogo.svg';
import ContactInputs from './ContactInputs';
import GenButton from '../Buttons/GenButton';
import {withRouter} from 'react-router-dom';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs'



const ContactForm = (props) => {
    const [formData, setFormData] = useState({})
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [messageErrorMessage, setMessageErrorMessage] = useState('')

    const updateInput = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (!formData.name){
            setFormData({
                name: 'אנונימי',
            })
        }
        console.log(formData)
        if (isFormValid()){
            sendEmail()
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
            })
            movePage()
        } else {
            return;
        }
    }

    const movePage = () => {
        props.history.push("./mail-sent")
    }

    const isFormValid = () => {
        let emailError, messageError = ''
        if (!formData.email){
            emailError = 'הכנס כתובת אימייל *'
        } else if (!isEmailValid()){
            emailError = 'הכנס כתובת אימייל תקינה *'

        }
        if (!formData.message){
            messageError = 'הכנס את תוכן הפנייה *'
        }
        if (emailError || messageError){
            setEmailErrorMessage(emailError)
            setMessageErrorMessage(messageError)
            return false;
        }
        return true;
    }

    const isEmailValid = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)){
            return true;
        }
        return false;
    }

    const sendEmail = () => {
        Axios.post(
            'https://us-central1-darey-rehov.cloudfunctions.net/submit',
            formData
        )
        .then(res =>{
            db.collection('emails').add({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: formData.message,
                time: new Date(),
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
        <div className="page" align="Center">
        <div align="right" className="crumbs-contact"><BreadCrumbs crumbsLen={2} first="ראשי" firstPath=".././" second="צור קשר"></BreadCrumbs></div>
        <div className="contactPageForm">
                <div align="Center"> <img src={mailLogo}></img></div>
                <div dir="rtl" className="firstLine">אנחנו כאן כדי לשמוע</div>
                <div dir="rtl" className="secondLine">יש לך שאלה? נתקלת בבעה?</div>
                <div dir="rtl" className="thirdLine">תכתוב לנו, תשאיר פרטים ונחזור אליך</div>
                <div>
                    <div align="right" className="fieldName">שם</div>
                    <ContactInputs
                    fieldText="שם"
                    changeFunc={updateInput}
                    inputType="text"
                    identifier="name"
                    n="name"
                    val={formData.name || ''}
                    >    
                    </ContactInputs>
                    <div align="right" className="fieldName">מספר טלפון</div>
                    <ContactInputs
                    fieldText="052-3456789"
                    changeFunc={updateInput}
                    inputType="text"
                    identifier="phoneNumber"
                    n="phone"
                    val={formData.phone || ''}
                    ></ContactInputs>
                    <div align="right" className="fieldName">* כתובת אימייל</div>
                    <div className="errorMessages">
                        {emailErrorMessage}
                    </div>
                    <ContactInputs
                    fieldText="john@email.com"
                    changeFunc={updateInput}
                    inputType="email"
                    identifier="email"
                    n="email"
                    val={formData.email || ''}
                    ></ContactInputs>
                    <div align="right" className="fieldName">* ספר לנו על פנייתך</div>
                    <div className="errorMessages">
                        {messageErrorMessage}
                    </div>
                    <textarea 
                    className="paragraph" 
                    dir="rtl" 
                    placeholder="תוכן הפניה" 
                    type="text" 
                    id="message" 
                    onChange={updateInput}
                    name="message"
                    value={formData.message || ''}
                    ></textarea>
                </div>
                <div className="sendButton"><GenButton 
                buttonStyle="btn--mailSend--solid"
                buttonSize="btn--send"
                onClick={handleSubmit}
                type="submit"
                >שלח</GenButton></div>
            </div>
            </div>

        </form>
        </>
    )
}

export default withRouter(ContactForm);