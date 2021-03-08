import React, { Component } from 'react'
import './UsersDetails.css'
import progress_bar from './../../Images/PlaceForm/progress5.svg'
import firebase from "../../Firebase"
import chevron_right from './../../Images/PlaceForm/chevron-right.svg'
import chevron_left from './../../Images/PlaceForm/chevron-left.svg'

const db  = firebase.firestore();
class UsersDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            //  agesRangeError:"",
            //  genderError:"",
            //  uniquePopulationsError:"",
            //  wellFareRecognitionError:"",
        }
    }
    
    // isValid = () => {
    //     const {values} = this.props;
    //     let agesRangeError="";
    //     let genderError="";
    //     let uniquePopulationsError="";
    //     let wellFareRecognitionError="";
    //     if(values.agesRange === ""){
    //         agesRangeError = "*בחר טווח גילאים"
    //     }
    //     if(values.gender === ""){
    //         genderError = "*בחר מין"
    //     }
    //     if(values.uniquePopulations === ""){
    //         uniquePopulationsError = "*בחר אוכלוסיות ייחודיות"
    //     }
    //     if(values.wellFareRecognition === ""){
    //         wellFareRecognitionError = "*בחר הכרה ברווחה"
    //     }
    //     if(agesRangeError || genderError || uniquePopulationsError || wellFareRecognitionError){
    //         this.setState({
    //             agesRangeError:agesRangeError,
    //             genderError:genderError,
    //             uniquePopulationsError:uniquePopulationsError,
    //             wellFareRecognitionError:wellFareRecognitionError
    //         })
    //         return false;
    //     }
    //     return true;
    // }

    continue = (event) => {
        event.preventDefault();
        // const isValid = this.isValid();
        // if(isValid){
            this.props.nextStep();
        // }else{return;}
    }

    goBack = (event) => {
        event.preventDefault();
        this.props.previousStep();
    }

    getDocumentsFromTable = (dbTableName) => {
        var arr = []
        return db.collection(dbTableName).get().then((table) => {
            table.docs.forEach(doc => {
                arr.push(doc.data())
            })
            return arr;
        })
    }

    // this method loads a T from firestore DB and stores them in
    // dbCategoriesList from NewPlaceForm
    /*
     input: dbTableName - describes the Table name in the DB
            tableData   - describes the state's object name in NewPlaceForm.js
                          which will hold the input Table's data
     method: the function loads the data with the given Table name from the DB and stores it in
            NewPlaceForm state's object according to tableData
    */
    getTableFromDB = (dbTableName, tableData) => {
        var documents = []
        const { handleArrayChangeByValue } = this.props;
            this.getDocumentsFromTable(dbTableName).then(res => {
                documents = res;
                documents.forEach(document => {
                    handleArrayChangeByValue(tableData,document);
                })
            })
    }

    componentDidMount(){
        const { didLoadUserDetails, handleChangeByValue } = this.props;
        if(!didLoadUserDetails){
            // users Compatibility DB table name
            const dbTable = 'user_compatibility';
            // this is the name of the object which holds the users Compatibility DB table 
            const usersCompatibilityObjectName = 'usersCompatibilityDocs';
            // object in NewPlaceForm.js state
            this.getTableFromDB(dbTable,usersCompatibilityObjectName);
            handleChangeByValue("didLoadUserDetails",true);
        }
    }

    // if this form in on edit Mode - then this method makes sure the chosen option
    // is the selected option in the select
    getDiv = (arrValues, selectedValue) => {
        var options = [];
        options.push(<option key="non-selected" value="">בחר</option>)
        arrValues.forEach(option => {
            if(selectedValue === option){
                options.push(
                    <option selected key={option} value={option}>
                        {option}
                    </option>
                )
            }
            else{
                options.push(
                    <option key={option} value={option}>
                        {option}
                    </option>
                )
            }
        });  
        return options;                              
    }

    render() {
        // const {agesRangeError, genderError, uniquePopulationsError,wellFareRecognitionError} = this.state
        const { values, handleChange, usersCompatibilityDocs } = this.props
        var uniquePopulationsValues=[];
        var wellFareRecognitionValues=[];
        if(usersCompatibilityDocs[0]){
            if(usersCompatibilityDocs[0]["field"] === "uniquePopulation"){
                uniquePopulationsValues = usersCompatibilityDocs[0]["values"];
            }
        }
        if(usersCompatibilityDocs[1]){
            if(usersCompatibilityDocs[1]["field"] === "wellFareRecognition"){
                wellFareRecognitionValues = usersCompatibilityDocs[1]["values"];
            }
        }
        const populationsDiv = this.getDiv(uniquePopulationsValues, values.uniquePopulations)
        const recognitionDiv = this.getDiv(wellFareRecognitionValues, values.wellFareRecognition)
        return (
            <div dir="rtl" className="users-details-wrapper">
                <div>{this.props.breadCrumb}</div>
                <div>
                    <label className="title">התאמה למשתמש</label>
                </div>
                <div className="add-new-place-error">
                    {/* {agesRangeError} */}
                </div>
                <div className="add-new-place-div">
                    <label className="pageLabel user-details-labels">טווח גילאים</label>
                    <select className="select-class user-details-selects" id="ages-range" margin="auto" defaultValue={values.agesRange}
                            onChange={handleChange('agesRange')}>
                        <option value="">בחר</option>
                        <option value="0-18">0-18</option>
                        <option value="18-65">18-65</option>
                        <option value="65+">65+</option>
                        <option value="כל הגילאים">כל הגילאים</option>
                    </select>
                </div>
                <div className="add-new-place-error">
                    {/* {genderError} */}
                </div>
                <div className="add-new-place-div">
                    <label className="pageLabel user-details-labels">מין</label>
                    <select className="select-class user-details-selects" id="user-gender" margin="auto" defaultValue={values.gender}
                            onChange={handleChange('gender')}>
                        <option value="">בחר</option>
                        <option value="זכר">זכר</option>
                        <option value="נקבה">נקבה</option>
                        {/* <option value="שני המינים">שני המינים</option> */}
                    </select>
                </div>
                <div className="add-new-place-error">
                    {/* {uniquePopulationsError} */}
                </div>
                <div className="add-new-place-div">
                    <label className="pageLabel user-details-labels">אוכלסיות ייחודיות</label>
                    <select className="select-class user-details-selects" id="unique-populations" margin="auto" defaultValue={values.uniquePopulations}
                            onChange={handleChange('uniquePopulations')}>
                        {populationsDiv
                        /* <option value="">בחר</option>
                        {uniquePopulationsValues.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))} */}
                    </select>
                </div>
                <div className="add-new-place-error">
                    {/* {wellFareRecognitionError} */}
                </div>
                <div className="add-new-place-div">
                    <label className="pageLabel user-details-labels">הכרה ברווחה</label>
                    <select id="well-fare-recognition" margin="auto" defaultValue={values.wellFareRecognition}
                            className="select-class user-details-selects" onChange={handleChange('wellFareRecognition')}>
                        {/* <option value="">בחר</option> */}
                        {recognitionDiv
                        /* {wellFareRecognitionValues.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))} */}
                    </select>
                </div>
                {/* <div className="progress-buttons-wrapper">
                    <div>
                        <button onClick={this.goBack}>חזור</button>
                    </div>
                    <div>
                        <button onClick={this.continue}> המשך</button>
                    </div>
                </div>
                <p style={{"marginBottom": "5%"}}></p>
                <div align="center" className="progress-bar"><img src={progress_bar}/></div> */}
                <div className="progress-bar" align="center">
                    <img className="form-right-chevron" src={chevron_right} onClick={this.continue} />
                    <img className="progress-bar-img" src={progress_bar}/>
                    <img className="form-left-chevron" src={chevron_left} onClick={this.goBack} />
                </div>
            </div>
        )
    }
}

export default UsersDetails
