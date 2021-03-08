import React, { Component } from 'react'
import './CategoryDetails.css'
import progress_bar from './../../Images/PlaceForm/progress1.svg'
import firebase from "../../Firebase"
import chevron_right from './../../Images/PlaceForm/chevron-right.svg'
import chevron_left from './../../Images/PlaceForm/chevron-left.svg'
import { auth } from '../../Firebase/index.js';
import AdminLockedMessagePage from '../Admin/AdminLockedMessagePage'
import required from '../../Images/required.svg'


const db  = firebase.firestore();
class CategoryDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             classPhoneIndex: 0,
             placeTypeError:"",
             subCategoryError:"",
             contactNameError:"",
             phonesError:"",
        }
    }
    
    arePhoneNumbersValid = (phoneNumbers) => {
        var nineDigits = /^\d{9}$/;
        var tenDigits = /^\d{10}$/;
        if(!(nineDigits.test(phoneNumbers[0])) && !(tenDigits.test(phoneNumbers[0]))){
            return false;
        }
        return true;
    }

    isValid = () => {
        const {values} = this.props;
        let placeTypeError="";
        let subCategoryError="";
        let contactNameError="";
        let phonesError="";
        if(values.placeType === ""){
            placeTypeError = "*בחר קטגוריה"
        }
        if(values.subCategory === ""){
            subCategoryError = "*בחר תת-קטגוריה"
        }
        if(values.contactName === ""){
            contactNameError = "*הכנס איש קשר"
        }
        if(!values.contactPhoneNo[0]){
            phonesError = "*הכנס מספר טלפון אחד לפחות"
        }
        const isPhoneValid = this.arePhoneNumbersValid(values.contactPhoneNo) 
        if(!isPhoneValid){
            phonesError = "* מספר הטלפון חייב להיות מורכב מ9-10 ספרות"
        }

        if(placeTypeError || subCategoryError || contactNameError || phonesError){
            this.setState({
                placeTypeError:placeTypeError,
                subCategoryError:subCategoryError,
                contactNameError:contactNameError,
                phonesError:phonesError
            })
            return false;
        }
        return true;
    }

    continue = (event) => {
        event.preventDefault();
        const isValid = this.isValid();
        if(isValid){
            this.props.nextStep();
        }else{return;}
    }

    // TODO: all comments are for mult' phone numbers
    addInputText = () => {
        var {phonesIndex} = this.props
        const {handleChangeByValue ,handleArrayChangeByValue, handlePhoneNumbers} = this.props
        phonesIndex += 1
        // sets the amounet of phones in the parent compnent of the add form
        handleChangeByValue('phonesIndex', phonesIndex);
        this.setState({classPhoneIndex:phonesIndex})
        var curDiv = document.getElementById('phone-number-div');
        var input = document.createElement("input");
        input.id = 'contact-phone-input-' + phonesIndex;
        input.type = 'text';
        input.name = 'name';
        input.className = 'new-place-input';
        input.placeholder = 'הכנס טלפון #' + (phonesIndex+1).toString();
        // sets that every change in the current phone field will set the value
        // at the add form parent compnent 
        input.onchange = handlePhoneNumbers('contactPhoneNo', phonesIndex)
        // add the new input to the parent component state to save it if the user continues to
        // the next page and then returns to this page
        handleArrayChangeByValue('phoneNumbersHistory', input)
        curDiv.appendChild(input)
    }
    

    // sync the number of phone numbers between this page and NewPlaceForm 
    checkIndexesSync = () =>{
        var curDiv = document.getElementById('phone-number-div');
        const {phonesIndex, phoneNumbersHistory} = this.props
        const {classPhoneIndex} = this.state
        if(phonesIndex !== classPhoneIndex){
            this.setState({classPhoneIndex:phonesIndex})   
            phoneNumbersHistory.forEach(inp => {
                curDiv.append(inp)
            });
        }
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


    updateCurrentSubCategories = (subCategoriesDB, category) => {
        const { handleArrayChangeByValue, resetArray, handleChangeByValue } = this.props;
        // find the match subcategories to current category
        const subCategoriesToRender = subCategoriesDB.filter(doc => 
            (doc["category"] === category));
        if(subCategoriesToRender.length){
            if(subCategoriesToRender[0]["sub_categories"]){
                const subCategoriesArr = subCategoriesToRender[0]["sub_categories"];
                resetArray("matchingSubCategories")
                const subCategory = subCategoriesArr[0];
                // get sub-categories options tags - first option is selected be default.
                const options = this.getSubCategoriesDiv(subCategoriesArr, subCategory, category) 
                handleChangeByValue('subCategory', subCategory)
                options.forEach(option => {
                    handleArrayChangeByValue("matchingSubCategories",option)
                });
            }
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user){
                this.setState({
                    showAdmin: true,
                    showNonAdmin: false
                })
                const { didLoadCategories, handleChangeByValue } = this.props;
                this.checkIndexesSync();
                // if this page alreay loaded places' categories, sub-categories from DB - skip,
                // o.w. - load and save them
                if(!didLoadCategories){
                    // categories DB table name
                    const dbCategoriesTable = 'places_categories';
                    // this is the name of the object which holds the categories DB table 
                    const categoriesListName = 'dbCategoriesList';
                    // sub-categories DB table name
                    const dbSubCategoriesTable = 'places_sub_categories';
                    // this is the name of the object which holds the categories DB table
                    const subCategoriesListName = 'subCategoriesDB';
                    // loads the Data from the Table in the DB and stores it in the corresponding
                    // object in NewPlaceForm.js state
                    this.getTableFromDB(dbCategoriesTable,categoriesListName);
                    this.getTableFromDB(dbSubCategoriesTable,subCategoriesListName);
                    handleChangeByValue("didLoadCategories",true);       
            }
            }else{
                this.setState({
                    showAdmin: false,
                    showNonAdmin: true
                })
            }
        })
    }


    // this function gets the current category, and initialize sub-category Select options
    // with the corresponding sub-categories to the current category
    onChangeCategories = (subCategoriesDB) => {
        const category = document.getElementById('categories').value
        // sets current category in state
        this.props.handleChangeByValue('placeType',category);
        this.updateCurrentSubCategories(subCategoriesDB, category)
    }

    getCategoriesDiv = (dbCategoriesList, placeType) => {
        var options = []
        options.push(<option key="empty" value="" disabled>בחר</option>)
        dbCategoriesList.forEach(option => {
            if(placeType === option["categoryName"]){
                options.push(
                    <option key={option["categoryName"]} selected value={option["categoryName"]}>
                    {option["value"]}
                    </option>
                )    
            }else{
            options.push(
                <option key={option["categoryName"]} value={option["categoryName"]}>
                {option["value"]}
                </option>
            )
        }    
        });
        return options 
    } 

    /*
    input: subCategories - array of sub-categories to display
           currentSubCategory - get the current selected sub-category if was chosen clicked (like in edit form)
                                o.w. gets initialized with undefined
           placeType - the current place type matches to the sub-categories
    output: array of HTML options.
    method: the method returns the corresponding HTML options to the sub-categories input array
    */
    getSubCategoriesDiv = (subCategories, currentSubCategory, placeType) => {
        var options = []
        // in order to load in the first render the sub-category in edit place mode
        options.push(<option key="no-category" value="" disabled>בחר</option>)
        subCategories.forEach(option => {
            if(currentSubCategory && currentSubCategory === option){
                options.push(
                    <option key={option+placeType} selected value={option}>
                        {option}
                    </option>
                )    
            }else{
            options.push(
                <option key={option+placeType} value={option}>
                    {option}
                </option>
            )
        }    
        });
        return options 
    }

    getEditFormSubcategories = (subCategoriesDB, category, placeSubCategory) => {
        // gets an object which conssists of the input category's sub-categories
        const temp = subCategoriesDB.filter(doc => (doc["category"] === category));
        if (temp) {
            if(temp.length){
                // if there are sub-categories matching to the input category - return them
                if(temp[0]["sub_categories"]){
                    const subCategories = temp[0]["sub_categories"];
                    return this.getSubCategoriesDiv(subCategories , placeSubCategory, category)
                }
           }
        }
    }

    render() {
        const { values, handleChange, handlePhoneNumbers, dbCategoriesList, 
            subCategoriesDB, matchingSubCategories } = this.props;
        const { placeToEdit } = this.props;
            const {placeTypeError,subCategoryError,contactNameError, phonesError} = this.state;
        const categoriesDiv = this.getCategoriesDiv(dbCategoriesList, values.placeType);
        var subCategoriesToRender = [];
        const category = values.placeType;
        const subCategory = values.subCategory;
        // if the form is for editting place (not adding new one) - the first render requires
        // loading the corresponding sub-categories to the place's category
        if(placeToEdit && subCategoriesToRender.length === 0){
            subCategoriesToRender = this.getEditFormSubcategories(subCategoriesDB, category, subCategory)
        }
        // this is an adding form
        else{
            // if there are sub-categories to show then get them
            if(matchingSubCategories.length){
                subCategoriesToRender = matchingSubCategories
            }
            // else (if this is the first render in adding new place or there are no sub-categories):
            // init with default option
            else{
                subCategoriesToRender.push(<option key="empty-sub" value="" disabled >בחר</option>) 
            }
        }
            // return (
            var adminDisplay =    
            <div className="formDiv">
            {/* <form onSubmit={this.continue}> */}
            <div>{this.props.breadCrumb}</div>
            <div dir="rtl" className="category-details-wrapper">                
                <div >
                    <label className="title">קטגוריה</label>
                </div>
                <div className="add-new-place-error">
                    {placeTypeError}
                </div>
                <img className="requiredFill category-details-label Categ" src={required}/>
                <div className="add-new-place-div category-details-div">
                    <label className="pageLabel category-details-label">קטגוריה</label>
                    <select className="select-class" id="categories" defaultValue={values.placeType}
                            onChange={()=>this.onChangeCategories(subCategoriesDB)}>
                            {categoriesDiv}
                    </select>
                </div>
                <div className="add-new-place-error" >
                    {subCategoryError}
                </div>
                <img className="requiredFill category-details-label Categ" src={required}/>
                <div className="add-new-place-div category-details-div">
                <label className="pageLabel category-details-label" >תת-קטגוריה</label>
                    <select className="select-class" id="subCategories" onChange={handleChange('subCategory')}
                            defaultValue={values.subCategory}>
                            {/* <option value="" disabled>בחר תת קטגוריה</option> */}
                            {subCategoriesToRender}
                    </select>
                </div>
                <div className="add-new-place-error" >
                    {contactNameError}
                </div>
                <img className="requiredFill Categ category-details-label" src={required}/>
                <div className="add-new-place-div-span category-details-div-select">
                    <label className="pageLabel label-margin category-details-label">שם איש קשר</label>
                </div>
                <div>
                    <input
                        dir="rtl" type="text" className="new-place-input" id="contact-name-input" name="contact-name"
                        placeholder="הכנס שם" onChange={handleChange('contactName')}
                        defaultValue={values.contactName} >
                    </input>
                </div>
                <div className="add-new-place-error" >
                    {phonesError}
                </div>
                <img className="requiredFill category-details-label Categ" src={required}/>
                <div className="add-new-place-div-span category-details-div-select">
                    <label className="pageLabel label-margin category-details-label">מספר ליצירת קשר</label>
                </div>
                <div id="phone-number-div">
                    <input
                        dir="rtl" type="text" className="new-place-input" id="contact-phone-input-0" name="contact-phone"
                        placeholder='הכנס טלפון #1' onChange={handlePhoneNumbers('contactPhoneNo',0)}
                        defaultValue={values.contactPhoneNo[0]} >
                    </input>
                </div>
                <div>
                <button id="btn" className="additional-phone" type="button" onClick={this.addInputText}>הוסף מספר נוסף +</button>
                </div>
                <div className="progress-bar" align="center">
                    <img className="form-right-chevron" src={chevron_right} onClick={this.continue} />
                    <img className="progress-bar-img" src={progress_bar}/>
                    <img className="form-left-chevron" id="first-page-chevron" src={chevron_left} />
                </div>
            </div>
            {/* </form> */}
            </div>
        // )
        return (
            <div>
                {this.state.showAdmin && adminDisplay}
                {this.state.showNonAdmin && <AdminLockedMessagePage/>}
            </div>
        );
    }
}

export default CategoryDetails