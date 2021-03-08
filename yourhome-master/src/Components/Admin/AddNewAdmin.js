import React, {Component} from 'react'
import InputField from './InputField.js'
import GenButton from '../Buttons/GenButton.js'
import './admin.css'
import './addnewadmin.css'
import firebase from "../../Firebase"
import {withRouter} from 'react-router-dom';
import AdminLockedMessagePage from './AdminLockedMessagePage'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import logo100px from '../../Images/logo100px.svg'
import {Link} from 'react-router-dom'
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs'

var auth = firebase.auth();
var db  = firebase.firestore();

class AddNewAdmin extends Component{
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        showAdmin: false,
        showNonAdmin: false,
        usernameErrorMessage: '',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        confirmationErrorMessage: '',
        passwordMatchError: '',
        openModal: false,
    }
    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user){
                this.setState({showAdmin: true})
                this.setState({showNonAdmin: false})
            } else {
                this.setState({showNonAdmin: true})
                this.setState({showAdmin: false})
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.handleSignUpWithPassword();
    }
    onOpenModal = () => {
        this.setState({ openModal: true });
    };

    onCloseModal = () => {
        this.setState({ openModal: false });
    };

    handleSignUpWithPassword = () => {
        if (this.isFormValid()){
            if (this.state.password === this.state.passwordConfirm){
                auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(res => {
                    db.collection("Admin").doc(res.user.uid).set({
                        email: this.state.email,
                        username: this.state.username
                    })
                    this.onOpenModal()
                }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/email-already-in-use'){
                        this.setState({
                            emailErrorMessage: "אימייל זה נמצא כבר בשימוש *",
                            usernameErrorMessage: '',
                            passwordErrorMessage: '',
                            confirmationErrorMessage: '',
                            passwordMatchError: '',
                        })
                    } else if (errorCode === 'auth/invalid-email'){
                        this.setState({
                            emailErrorMessage: "כתובת האימייל אינה תקינה *",
                            usernameErrorMessage: '',
                            passwordErrorMessage: '',
                            confirmationErrorMessage: '',
                            passwordMatchError: '',
                        })
                    } else if (errorCode === 'auth/weak-password'){
                        this.setState({
                            passwordErrorMessage: "סיסמא חלשה מדי - חובה לפחות 6 תווים *",
                            usernameErrorMessage: '',
                            emailErrorMessage: '',
                            confirmationErrorMessage: '',
                            passwordMatchError: '',
                        })
                    } else {
                        alert(errorMessage)
                    }
                })
            } else {
                this.setState({
                    passwordMatchError: "סיסמא ואימות סיסמא אינן תואמות *",
                    usernameErrorMessage: '',
                    passwordErrorMessage: '',
                    emailErrorMessage: '',
                    confirmationErrorMessage: '',
                })
            }
        } else{
            return;
        }
    }
    isFormValid = () => {
        const {username, email, password, passwordConfirm} = this.state
        let userError, emailError, passwordError, confirmError = ''
        if (!username){
            userError = "הכנס שם משתמש *"
        } 
        if (!email){
            emailError = "הכנס אימייל *"
        }
        if (!password){
            passwordError = "הכנס סיסמא *"
        }
        if (!passwordConfirm){
            confirmError = "הכנס אימות סיסמא *"
        }
        if (userError || emailError || passwordError || confirmError){
            this.setState({
                usernameErrorMessage: userError,
                emailErrorMessage: emailError,
                passwordErrorMessage: passwordError,
                confirmationErrorMessage: confirmError,
            })
            return false;
        }
        return true
    }

    render(){
        const {openModal} = this.state;
        var adminDisplay =
        <div className="adminHomeDiv">
                <div className="crumbs"><BreadCrumbs crumbsLen={2} first="ראשי" firstPath=".././admin" second="הוסף משתמש חדש"></BreadCrumbs></div> 
                <div className="addNewAdminDiv">
                <div >
                    <p className="addTitle">הוסף משתמש חדש</p>
                </div>
                <div className="errorMessage">
                    {this.state.usernameErrorMessage}
                </div>
                <div align="Center">
                    <InputField 
                    fieldText="שם משתמש" 
                    inputType="text" 
                    changeFunc={this.handleChange} 
                    identifier="username">
                    </InputField>
                </div>
                <div className="errorMessage">
                    {this.state.emailErrorMessage}
                </div>
                <div align="Center">
                    <InputField 
                    fieldText="אימייל" 
                    inputType="email" 
                    changeFunc={this.handleChange} 
                    identifier="email">
                    </InputField>
                </div>
                <div className="errorMessage">
                    {this.state.passwordErrorMessage}
                </div>
                <div align="Center">
                    <InputField 
                    fieldText="סיסמא" 
                    inputType="password" 
                    changeFunc={this.handleChange} 
                    identifier="password">
                    </InputField>
                </div>
                <div className="errorMessage">
                    {this.state.confirmationErrorMessage}
                </div>
                <div align="Center">
                    <InputField 
                    fieldText="חזור על סיסמא" 
                    inputType="password" 
                    changeFunc={this.handleChange} 
                    identifier="passwordConfirm">
                    </InputField>
                </div>
                <div className="errorMessage">
                    {this.state.passwordMatchError}
                </div>
                <div className="genbutton" align="center">
                <br></br>
                <GenButton 
                className="dsdsds"
                onClick={this.handleSubmit}
                // onClick={() => this.onOpenModal()}
                type="button"
                buttonStyle="btn--accept--solid"
                buttonSize="btn--small"
                >צור משתמש חדש</GenButton>
                </div>
                <Modal
                    classNames={{ modal: "newAdminModal" }}
                    open={openModal}
                    onClose={this.onCloseModal}
                    showCloseIcon={false}
                    center
                    >
                        <div align="center" className="new-admin-popup">
                        <div align="center" className="new-admin-popud-logo">
                                <img src={logo100px}/>
                        </div>
                        <div className="closeModalButton" onClick={this.onCloseModal}><a>&times;</a></div>
                        <div align="center" className="welcome-message" dir='rtl'>אדמין {this.state.username} הוספ/ה בהצלחה :)</div>
                            <div className="welcome-button-div" align="center">
                            <Link to='./admin'><button className="welcome-button" onClick={() => this.onCloseModal()}>המשך</button></Link>
                            </div>
                        </div>
                        </Modal>
                        </div>
            </div>


        return(
            <div>
            {this.state.showAdmin && adminDisplay}
            {this.state.showNonAdmin && <AdminLockedMessagePage/>}
            </div>
        );
    }
}

export default withRouter(AddNewAdmin);