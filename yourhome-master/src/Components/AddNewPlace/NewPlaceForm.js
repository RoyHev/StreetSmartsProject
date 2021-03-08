import React, { Component } from 'react'
import CategoryDetails from './CategoryDetails'
import ServiceDetails from './ServiceDetails'
import AddressDetails from './AddressDetails'
import OpeningHours from './OpeningHours'
import UsersDetails from './UsersDetails'
import AcceptanceTerms from './AcceptanceTerms'
import Success from './Success'
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs'

class NewPlaceForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditMode:false,
            step: 1,
            id: '',
            // stores all categories from firestore DB once CategoryDetails page invokes at
            // the first time
            dbCategoriesList: [],
            // stores all sub-categories from firestore DB once CategoryDetails page invokes at
            // the first time. Each category has different sub-categories.
            subCategoriesDB: [],
            matchingSubCategories: [],
            // gets true once all categories from firestore DB were read in CategoryDetails page
            didLoadCategories:false,
            placeType: '',
            subCategory: '',
            contactName: '',
            // array of phone numbers
            contactPhoneNo: [],
            placeName: '',
            placeDescription: '',
            placeCity: '',
            placeStreet:'',
            buildingNumber: '',
            postalCode: '',
            // array which consists of 7 days objects
            openingHours: this.initOpeningHours(),
            openingHoursRadiosState: {'contact-later':true, 'always-open':false, 'manually':false},
            agesRange:'',
            gender: '',
            didLoadUserDetails:false,
            usersCompatibilityDocs: [],
            uniquePopulations:'',
            wellFareRecognition: '',
            isIdRequired: false,
            doesCriminalRecordFit: false,
            doesAddictedUsersFit: false,
            isImmediateService: false,
            phonesIndex: 0,
            phoneNumbersHistory: [],
            // if the coordinates are undefined then the place's location won't be appeared on the map
            longitude: null,
            latitude: null,
        }
    }
    
    /*
        method: set all days' opening hours to 23:59
    */
    initOpeningHours = () => {
        var hoursArr = [];
        for (let index = 0; index < 7; index++) {
            hoursArr.push({
                // the hour of the opening time
                openHour: '23',
                // the minutes of the opening time
                openMinutes: '59',
                // the hour of the closing time
                closeHour: '23',
                // the minutes of the closing time
                closeMinutes: '59',
            });
        }
        return hoursArr;
    }

    // go to the next step
    nextStep = () => {
        const {step} = this.state;
        this.setState({step : step + 1})
    }

    // go back to the previous step
    previousStep = () => {
        const {step} = this.state;
        this.setState({step : step - 1})        
    }

    /*
        input: 1. int day - represents the day which it's opening hours will
                  be set (0-sunday, 1-monday, ..., 6-saturday)
               2. string parameterChanged - the day's arg which will be
                  set (openHour/openMinutes/closeHour/closeMinutes)
               3. event - the event called this method (invoked from OpeningHours.js)
        method: this method sets the corresponding data of the given day according to the
                value of the event which invoked this method (once OpeningHours.js page recognized
                set of new hours)
    */
    openingHoursHandler = (day,parameterChanged) => (event) => {
        const newOpeningHours = this.state.openingHours;
        var newValue = event.target.value
        // adding 0 to minutes/hours which are:'0-9'
        if(parseInt(newValue) < 10 && newValue.length == 1){ newValue = '0' + newValue}
        newOpeningHours[day][parameterChanged] = (newValue)
        this.setState({openingHours:newOpeningHours})
    }

    /*
        method: once the user clicked "contact later for opening hours" option in OpeningHours.js,
                the method set all the days' opening time to 23:59-23:59
    */
    setHoursLater = () =>{
        var tempArr = []
        tempArr = this.initOpeningHours();
        this.setState({openingHours:tempArr})
    }

    /*
    method: once the user clicked "place is always open" option in OpeningHours.js,
            the method set all the days' opening time to 00:00-23:59
    */
    setAlwaysOpenHours = () => {
        var tempArr = []
        for (let index = 0; index < 7; index++) {
            tempArr.push({
                openHour: '00',
                openMinutes: '00',
                closeHour: '23',
                closeMinutes: '59',
            });
        }
        this.setState({openingHours:tempArr})
        
    }

    /*
        input: string fieldName - describes a state's field.
        method: the method sets the given state's field to the value of the invoking event 
    */
    handleChange = (fieldName) => (event) => {
        this.setState({[fieldName]:event.target.value})        
    }
 
    handleChangeByValue = (fieldName,value) => {
        this.setState({[fieldName]:value})
    }

    handleArrayChangeByValue = (fieldName,value) => {
        const temp = this.state[fieldName]
        temp.push(value)
        this.setState({[fieldName]:temp})
    }

    resetArray = (fieldName) => {
        const temp = this.state[fieldName]
        while(temp.length>0){temp.pop()}        
        this.setState({[fieldName]:temp})
    }

    /*
        input: a string which describes an input id that ends in "-NUMBER"
        method: extracts and returns the corresponding index for contactPhoneNo Array
                from the given inputID
    */
    getArrIndex = (inputID) => {
        const idLength = inputID.length;
        var arrIndex = ''
        for(var i = idLength; i>=0; i--){
            var digit = inputID.charAt(i) 
            if(digit >= '0' && digit <= '9'){
                arrIndex += digit;
            }else{break;}
        }
        return arrIndex;
    }

    handlePhoneNumbers = (fieldName, phoneIndex) =>(event) =>{
        const temp = this.state[fieldName];
        // const arrIndex = this.getArrIndex(inputID)
        // check the returned arrIndex is a number
        if(!isNaN(parseInt(phoneIndex))){
            temp[parseInt(phoneIndex)] = event.target.value
            this.setState({[fieldName]:temp})
        }
        return;
    }

    /*
        method: this method sets the states of the boolean acceptance-terms properties
                in order to save the checking state at that page.
    */
    checkboxChangeHandler = (fieldName) => (event) => {
        this.setState({[fieldName]:event.target.checked})
    }

    /*
        input: string fieldName - describes the state's field which will be changed
               string keyName - describes a key in fieldName which it's value will be true.
        method: this method sets the state of openingHoursRadiosState in order to save
                the checking state at that page. The value of the key 'keyName' will get
                true while all others will get false.
    */
    radioCheckStateHandler = (fieldName, keyName) => {
        const temp = this.state[fieldName]
        Object.keys(temp).forEach( key =>{
            if(key === keyName){
                temp[key] = true
            }else{ temp[key] = false }
        })
        this.setState({[fieldName]:temp})
    }

    setValuesForEditPlace = (placeToEdit) => {
        this.setState({isEditMode:true})
        for(let [key,value] of Object.entries(placeToEdit)){
            this.setState({[key]: value})
        }
    }

    // checks if this form is called for editing an exisiting place - 
    // if this is TRUE then this func sets the existing place as the state of this form,
    // o.w. - this is a new place adding form - the fund does not set the state.
    componentDidMount(){
        const{placeToEdit} = this.props
        if(placeToEdit){   
            this.setValuesForEditPlace(placeToEdit)    
        }
        
    }

    render() {
        const { step } = this.state;
        const { openingHoursRadiosState } = this.state
        const { formCompleteHandler } = this.props
        const { id, placeType,subCategory,contactName,contactPhoneNo, placeName, placeDescription,
                placeCity, placeStreet, buildingNumber, postalCode, longitude, latitude,
                openingHours, agesRange, gender, uniquePopulations, wellFareRecognition, doesAddictedUsersFit,
                 isIdRequired, doesCriminalRecordFit, isImmediateService } = this.state;
        // the properties of the new places.
        // var values;

        const values = {id, placeType,subCategory,contactName,contactPhoneNo,placeName,placeDescription,
            placeCity, placeStreet, buildingNumber, postalCode, longitude, latitude,
            openingHours, agesRange, gender, uniquePopulations, wellFareRecognition,
            doesAddictedUsersFit, isIdRequired, doesCriminalRecordFit, isImmediateService
        }
        const {dbCategoriesList} = this.state;
        const {subCategoriesDB, usersCompatibilityDocs} = this.state;
        const {matchingSubCategories} = this.state;
        const {didLoadCategories, didLoadUserDetails} = this.state;
        const{isEditMode} = this.state;
        if (isEditMode){
            var breadCrumb = <div align="right" className="crumbs-hotlines"><BreadCrumbs crumbsLen={2} first="ראשי" firstPath=".././admin" second="ערוך מידע קיים"></BreadCrumbs></div>
        } else {
            var breadCrumb = <div align="right" className="crumbs-hotlines"><BreadCrumbs crumbsLen={2} first="ראשי" firstPath=".././admin" second="הוסף מידע חדש"></BreadCrumbs></div>
        }
        switch(step){
            case 1:
                return (
                    <CategoryDetails
                        nextStep={this.nextStep} handlePhoneNumbers={this.handlePhoneNumbers}
                        didLoadCategories={didLoadCategories} handleChangeByValue={this.handleChangeByValue}
                        handleChange={this.handleChange} values={values}
                        phonesIndex={this.state.phonesIndex} phoneNumbersHistory={this.state.phoneNumbersHistory}
                        handleArrayChangeByValue={this.handleArrayChangeByValue}
                        dbCategoriesList={dbCategoriesList}
                        subCategoriesDB = {subCategoriesDB}
                        matchingSubCategories={matchingSubCategories}
                        resetArray={this.resetArray}
                        isEditMode={isEditMode} placeToEdit={this.props.placeToEdit}
                        breadCrumb={breadCrumb}
                    />
                )
                case 2:
                return (
                    <ServiceDetails
                        nextStep={this.nextStep} previousStep={this.previousStep}
                        handleChange={this.handleChange} values={values}
                        breadCrumb={breadCrumb}
                    />
                )
                case 3:
                return (
                    <AddressDetails
                        nextStep={this.nextStep} previousStep={this.previousStep}
                        handleChange={this.handleChange} values={values}
                        breadCrumb={breadCrumb} handleChangeByValue={this.handleChangeByValue}
                    />
                )
                case 4:
                return (
                    <OpeningHours
                        nextStep={this.nextStep} previousStep={this.previousStep}
                        handleChange={this.openingHoursHandler} values={values}
                        setHoursLater={this.setHoursLater} setAlwaysOpenHours={this.setAlwaysOpenHours}
                        radioOnCheck={this.radioCheckStateHandler} openingHoursRadiosState={openingHoursRadiosState}
                        breadCrumb={breadCrumb}
                    />
                )
                case 5:
                return (
                    <UsersDetails
                        nextStep={this.nextStep} previousStep={this.previousStep}
                        handleChange={this.handleChange} values={values}
                        didLoadUserDetails={didLoadUserDetails}
                        usersCompatibilityDocs={usersCompatibilityDocs}
                        handleChangeByValue={this.handleChangeByValue}
                        handleArrayChangeByValue={this.handleArrayChangeByValue}
                        breadCrumb={breadCrumb}
                    />
                )
                case 6:
                return (
                    <AcceptanceTerms
                        nextStep={this.nextStep} previousStep={this.previousStep}
                        handleChange={this.checkboxChangeHandler} values={values}
                        formCompleteHandler={formCompleteHandler}
                        breadCrumb={breadCrumb}
                    />
                )
                case 7:
                return (
                    <Success
                        nextStep={this.nextStep} previousStep={this.previousStep}
                        previousStep={this.previousStep}
                        formCompleteHandler={formCompleteHandler}
                        handleChange={this.handleChange} values={values}
                        isEditMode={isEditMode}
                    />
                )
        }
            
    }
}

export default NewPlaceForm
