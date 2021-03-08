import React, {Component} from 'react';
import InputField from './InputField.js'
import './admin.css'
import blueCheckButton from '../../Images/AdminLogin/blueCheckButton.svg'
import { auth, db } from '../../Firebase/index.js';
import {withRouter} from 'react-router-dom';
import logo100px from '../../Images/logo100px.svg'
import loginLogo from '../../Images/AdminLogin/loginLogo.svg'
import './forgotpass.css'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {Redirect} from 'react-router'
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs'

class AdminLogin extends Component{
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            forgotPassEmail: '',
            open: false,
            flag: false,
            emailErrorMessage: '',
            passwordErrorMessage: '',
            forgotPassErrorMessage: '',
            finishedFlag: false,
            showAdmin: false,
            showNonAdmin: false,
        }
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ 
            open: false,
            forgotPassErrorMessage: '',
         });
    };

    movePage = () => {
        this.props.history.push("./admin")
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.handleSignInWithPassword()

    }
    isFormValid = () => {
        const {email, password} = this.state
        let emailError, passwordError = ''
        if (!email){
            emailError = "הכנס אימייל *"
        }
        if (!password){
            passwordError = "הכנס סיסמא *"
        }
        if (emailError || passwordError){
            this.setState({
                emailErrorMessage: emailError,
                passwordErrorMessage: passwordError
            })
            return false;
        }
        return true;
    }
    handleSignInWithUsername = (username) => {
        db.collection('Admin').get().then((snapshot) => {
            for (let i=0; i<snapshot.docs.length; i++){
                if (snapshot.docs[i].data().username === username){
                    auth.signInWithEmailAndPassword(snapshot.docs[i].data().email, this.state.password).then(res => {
                        this.setState({flag: true});
                        this.movePage()
                    }).catch((error) => {
                        var errorCode = error.code
                        var errorMessage = error.message
                        if (errorCode == 'auth/invalid-email'){
                            this.setState({
                                emailErrorMessage: "כתובת מייל לא תקינה *",
                                passwordErrorMessage: '',
                            })
                        } else if (errorCode == 'auth/user-disabled'){
                            this.setState({
                                emailErrorMessage: "משתמש זה אינו פעיל *",
                                passwordErrorMessage: '',
                            })
                        } else if (errorCode == 'auth/user-not-found'){
                            this.setState({
                                emailErrorMessage: "שם משתמש לא קיים *",
                                passwordErrorMessage: '',
                            })
                        } else if (errorCode == 'auth/wrong-password'){
                            this.setState({
                                passwordErrorMessage: "סיסמא שגויה *",
                                emailErrorMessage: '',
                            })
                        } else {
                            alert(errorMessage)
                        }
                    })
                }
            }
            this.setState({
                finishedFlag: true
            })
        })
        

    }
    handleSignInWithPassword = () => {
        if (this.isFormValid()){
            auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(res => {
                this.movePage()
            }).catch((error) => {
                var errorCode = error.code
                var errorMessage = error.message
                if (errorCode == 'auth/invalid-email'){
                    this.handleSignInWithUsername(this.state.email)
                    if (!this.state.flag && this.state.finishedFlag){
                        this.setState({
                            emailErrorMessage: "שם משתמש שגוי *",
                            passwordErrorMessage: '',
                        })
                    }
                } else if (errorCode == 'auth/user-disabled'){
                    this.setState({
                        emailErrorMessage: "משתמש זה אינו פעיל *",
                        passwordErrorMessage: '',
                    })
                } else if (errorCode == 'auth/user-not-found'){
                    this.setState({
                        emailErrorMessage: "לא קיים משתמש עם אימייל\שם משתמש זה *",
                        passwordErrorMessage: '',
                    })
                } else if (errorCode == 'auth/wrong-password'){
                    this.setState({
                        passwordErrorMessage: "סיסמא שגויה *",
                        emailErrorMessage: '',
                    })
                } else {
                    alert(errorMessage)
                }
            })
        } else {
            return;
        }
    }
    sendReset = (close) =>{
        auth.sendPasswordResetEmail(this.state.forgotPassEmail).then(function(){
            alert("Reset password email sent to your email address")
            close()
        }).catch((error) => {
            var errorCode = error.code
            var errorMessage = error.message
            if (errorCode == 'auth/invalid-email'){
                this.setState({
                    forgotPassErrorMessage: "אימייל לא תקין *"
                })
            } else if (errorCode == 'auth/user-not-found'){
                this.setState({
                    forgotPassErrorMessage: "אימייל שגוי *"
                })
            } else {
                alert(errorMessage)
            }
        })
    }
    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if (user){
                this.setState({
                    showAdmin: true,
                    showNonAdmin: false,
                })
            } else {
                this.setState({
                    showAdmin: false,
                    showNonAdmin: true,
                })

            }
        })
    }
    render(){
        const { open } = this.state;
        var nonAdminDisplay = <div className="adminLoginFullPage">
        <div className="crumbs"><BreadCrumbs crumbsLen={2} first="ראשי" firstPath=".././" second="התחברות אדמין"></BreadCrumbs></div>
        <div className="adminLoginDiv">
            <div className="picture" align="center">
                <img src={loginLogo}></img>
            </div>

            <div className="errorMessage">
                {this.state.emailErrorMessage}
            </div>
            <div align="center">
            <InputField fieldText="אימייל \ שם משתמש" inputType="text" changeFunc={this.handleChange} identifier="email"></InputField>
            </div>
            <div className="errorMessage">
                {this.state.passwordErrorMessage}
            </div>
            <div align="center">
            <InputField fieldText="סיסמא" inputType="password" changeFunc={this.handleChange} identifier="password"></InputField>
            </div>
            <div dir="rtl">
                <a className="forgotPass" onClick={this.onOpenModal}>שכחתי סיסמא</a>
                <Modal
                classNames={{ modal: "customModal" }}
                open={open}
                onClose={this.onCloseModal}
                showCloseIcon={false}
                center
                >
                    <div align="center" className="pass-popup">
                    <div align="center" className="logo-100-px">
                            <img src={logo100px}/>
                    </div>
                    <div className="closeButton" onClick={this.onCloseModal}><a>&times;</a></div>
                        <div align="center" className="forgot message" dir='rtl'>לשכוח סיסמא זה לא נורא :)</div>
                        <div align="right" className="forgot request" dir='rtl'>הכנס את כתובת האימייל שלך ונשלח אליך מייל לאיפוס סיסמא</div>
                        <div align="center" className="errorMessage">
                            {this.state.forgotPassErrorMessage}
                        </div>
                        <div align="center">
                            <input className="forgot input" type="email" id="forgotPassEmail" onChange={this.handleChange} placeholder="e.g. streetsmart@gmail.com"></input>
                        </div>
                        <div className="forgotPassButtonDiv" align="center">
                        <button className="forgot passButton" onClick={() => this.sendReset(this.onCloseModal)}>שלח</button>
                        </div>
                    </div>
                    </Modal>
            </div>
            <div align="center">
                <div className="submitButton" onClick={this.handleSubmit}><img src={blueCheckButton} className="checkBtn"></img></div>
            </div>
        </div>
        </div>
        var adminDisplay = <Redirect path to="./admin" />
        return (
            <div>
                {this.state.showAdmin && adminDisplay}
                {this.state.showNonAdmin && nonAdminDisplay}
            </div>
        );
    }
}

export default withRouter(AdminLogin);