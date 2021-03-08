import React, {Component} from 'react'
import './hotlinessecond.css'
import required from '../../Images/required.svg'
import colored_dot from '../../Images/Hotlines/colored_dot.svg'
import dot from '../../Images/Hotlines/dot.svg'
import { Multiselect } from 'multiselect-react-dropdown';
import chevron from '../../Images/chevron-down.svg'
import right_chevron from '../../Images/Hotlines/chevron-right.svg'
import left_chevron from '../../Images/Hotlines/chevron-left.svg'
import {withRouter} from 'react-router-dom'
import {Redirect} from 'react-router'
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs'

class NewHotlineSecond extends Component {
    constructor(props){
        super(props)
        this.multiSelectRef = React.createRef();
        this.state = {
            options: [{name: "אופציה אחת", id:0 }, {name: 'אופציה שנייה', id: 1}, {name: 'אופציה שלישית', id: 2}, {name: 'אופציה רביעית', id: 3}, {name: 'אופצחה חמישית', id: 4}, {name: 'אופציה שישית', id: 5}, {name: 'אופציה שביעית', id: 6}, {name: 'אופציה שמינית', id: 7}, {name: 'אופציה תשיעית', id: 8}],
            phoneErrorMessage: '',
            redirect: false,

        }
        this.style = {
            chips: {
              background: "none",
              color: "#263d43",
              float: "right",
              align: "right",
              fontWeight: "bold",
              fontFamily: "'Alef', sans-serif",
              fontSize: "16px"
            },
            searchBox: {
              border: "none",
              "borderBottom": "1px solid #263d43",
              "borderRadius": "0px",
              marginLeft: "5%",
              marginRight: "5%",
              fontFamily: "'Alef', sans-serif",
              textAlign: "right",
              direction: 'rtl'
            },
            inputField: {
                fontSize: "18px",
                fontFamily: "'Alef', sans-serif"
            },
            optionContainer: {
                textAlign: "right",
                fontFamily: "'Alef', sans-serif",
                marginLeft: "5%",
                marginRight: "5%"
            },
            option:{
                textAlign: 'rtl',
                fontWeight: 'bold'
            },
            multiselectContainer: {
              color: "#263d43",
            }
          };
    }
    isPhoneNumber = (phoneNumber) => {
        var tenDigitPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        var nineDigitPhone = /^\(?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!(tenDigitPhone.test(phoneNumber)) && !(nineDigitPhone.test(phoneNumber))){
            return false;
        }
        return true;
    }
    resetValues = () => {
        this.multiSelectRef.current.resetSelectedValues();
    }
    getSelectedValues = () => {
        return this.multiSelectRef.current.getSelectedItems();
    }
    goBack = (event) => {
        event.preventDefault();
        this.props.previousStep();
    }
    continue = (event) => {
        event.preventDefault();
        if (this.isPhoneNumber(this.props.values.servicePhone)){
            this.props.nextStep();
        } else {
            this.setState({
                phoneErrorMessage: "הכנס מספר טלפון תקין *"
            })
            return;
        }
    }
    handleTagChange = () => {
        const temp = this.getSelectedValues();
        this.props.handleTags(temp, "serviceTags")
    }
    handleSave = () => {
        if (this.isPhoneNumber(this.props.values.servicePhone)){
            this.props.saveHotline()
            this.setState({
                redirect: true
            })
        } else {
            this.setState({
                phoneErrorMessage: "הכנס מספר טלפון תקין *",
                redirect: false,
            })
            return;

        }

    }
    render(){
        const {values, handleChange} = this.props;
        if (this.state.redirect){
            return <Redirect push to="/hotlines-admin" />
        }
        var crumbsDisplay
        if (values.isUpdate){
            crumbsDisplay = <div className="crumbs-hotlines-add"><BreadCrumbs crumbsLen={3} first="ראשי" firstPath=".././admin" second="מספרי מצוקה" secondPath='.././hotlines-admin' third="ערוך מספר קיים"/></div>
        } else {
            crumbsDisplay = <div className="crumbs-hotlines-add"><BreadCrumbs crumbsLen={3} first="ראשי" firstPath=".././admin" second="מספרי מצוקה" secondPath='.././hotlines-admin' third="הוסף מספר חדש"/></div>
        }
        return(
            <div className="secondPage">
                {crumbsDisplay}
                <div className="newHotlineTitle" dir='rtl' align="center">פרטי השירות</div>
                    <div>
                        <div className="star" align='right'><img src={required}/></div>
                        <div className="nameofinput" align='right' dir='rtl'>מספר ליצירת קשר</div>
                    </div>
                    <div className="errorMessage">
                        {this.state.phoneErrorMessage}
                    </div>
                    <div align="center">
                        <input className="inputName" dir="rtl" placeholder="04-840-4444"
                        onChange={handleChange('servicePhone')}
                        defaultValue={values.servicePhone}>
                        </input>
                    </div>
                    <div className="nameofinput" dir='rtl'>תגיות</div>
                    <div className="dropDown" align="center">
                        <Multiselect
                        align="center"
                        options={this.state.options}
                        displayValue="name"
                        placeholder=""
                        ref={this.multiSelectRef}
                        closeIcon="cancel"
                        style={ this.style}
                        closeOnSelect={true}
                        showCheckbox={false}
                        selectedValues={values.serviceTags}
                        emptyRecordMsg="אין ערכים להציג"
                        onSelect={this.handleTagChange}
                        onRemove={this.handleTagChange}
                        />
                        <div className="chevronImg"><img src={chevron}/></div>
                    </div>
                    <div align="center" className="buttonDiv">
                        <button className="saveButton" onClick={this.handleSave}>שמירה</button>
                        <button className="showCardButton" onClick={this.continue}>לצפייה בכרטיס</button></div>
                    <div align="center" className="progressBar"><img className="leftChevron" src={left_chevron} onClick={this.goBack}/><img className="colored-dot" src={dot}/><img className="dot" src={colored_dot}/><img className="rightChevron" src={right_chevron}/></div>
            </div>

        );
    }
}

export default withRouter(NewHotlineSecond);