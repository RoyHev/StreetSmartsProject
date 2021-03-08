import React, {Component} from 'react'
import './hotlines.css'
import required from '../../Images/required.svg'
import colored_dot from '../../Images/Hotlines/colored_dot.svg'
import dot from '../../Images/Hotlines/dot.svg'
import './newhotlines.css'
import right_chevron from '../../Images/Hotlines/chevron-right.svg'
import left_chevron from '../../Images/Hotlines/chevron-left.svg'
import { auth } from '../../Firebase/index.js';
import AdminLockedMessagePage from '../Admin/AdminLockedMessagePage'
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs'

class NewHotlineFirst extends Component {
    constructor(props){
        super(props)
        this.state = {
            serviceNameErrorMessage: '',
            serviceInfoErrorMessage: '',
            showAdmin: false,
            showNonAdmin: false,

        }
    }
    continue = (e) => {
        e.preventDefault();
        if (this.isFormValid()){
            this.props.nextStep();
        } else {
            return;
        }
    }
    isFormValid = () => {
        let nameError, infoError = ''
        if (!this.props.values.serviceName){
            nameError = "הכנס את שם השירות *"
        }
        if (!this.props.values.serviceInfo){
            infoError = "הכנס תיאור השירות *"
        }
        if (infoError || nameError){
            this.setState({
                serviceNameErrorMessage: nameError,
                serviceInfoErrorMessage: infoError
            })
            return false;
        }
        return true;
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if(user){
                this.setState({
                    showAdmin: true,
                    showNonAdmin: false
                })
            } else {
                this.setState({
                    showAdmin: false,
                    showNonAdmin: true
                })
            }
        })
    }
    render(){
        const {values, handleChange} = this.props;
        var crumbsDisplay
        if (values.isUpdate){
            crumbsDisplay = <div className="crumbs-hotlines-add"><BreadCrumbs crumbsLen={3} first="ראשי" firstPath=".././admin" second="מספרי מצוקה" secondPath='.././hotlines-admin' third="ערוך מספר קיים"/></div>
        } else {
            crumbsDisplay = <div className="crumbs-hotlines-add"><BreadCrumbs crumbsLen={3} first="ראשי" firstPath=".././admin" second="מספרי מצוקה" secondPath='.././hotlines-admin' third="הוסף מספר חדש"/></div>
        }
        var adminDisplay = <div className="firstPage">
            {crumbsDisplay}
            <div className="newHotlineTitle" dir='rtl' align="center">פרטי השירות</div>
            <div>
                <div>
                    <div className="star" align='right'><img src={required}/></div>
                    <div className="nameofinput" align='right' dir='rtl'>שם השירות</div>
                </div>
                <div className="errorMessage">
                    {this.state.serviceNameErrorMessage}
                </div>
                <div align="center">
                    <input className="inputName" dir="rtl" placeholder="שם"
                    onChange={handleChange('serviceName')}
                    defaultValue={values.serviceName}>
                    </input>
                </div>
                <div>
                    <div className="star" align='right'><img src={required}/></div>
                    <div className="nameofinput" align='right' dir='rtl'>תיאור השירות</div>
                </div>
                <div className="errorMessage">
                    {this.state.serviceInfoErrorMessage}
                </div>
                <div align="center">
                    <textarea className="paragraphInput" dir="rtl" placeholder="תיאור השירות"
                    onChange={handleChange('serviceInfo')}
                    defaultValue={values.serviceInfo}></textarea>
                </div>
                <div align="center" className="progressBar"><img className="chevronLeft" src={left_chevron}/><img className="colored-dot" src={colored_dot}/><img className="dot" src={dot}/><img className="chevronRight" src={right_chevron} onClick={this.continue}/></div>
            </div>
        </div>
        return (
            <div>
                {this.state.showAdmin && adminDisplay}
                {this.state.showNonAdmin && <AdminLockedMessagePage/>}
            </div>
        );

    }
}

export default NewHotlineFirst;