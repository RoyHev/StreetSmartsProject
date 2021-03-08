import React, { Component, Children } from 'react'
import './MyButtonsMain.css'
import MyButton from './MyButton.js';
import lodging_icon from './../../Images/bed.svg'
import clothing_icon from './../../Images/clothing.svg'
import violence_icon from './../../Images/violence.svg'
import rehab_icon from './../../Images/rehab.svg'
import first_aid_icon from './../../Images/first-aid.svg'
import jobs_icon from './../../Images/jobs.svg'
import food_icon from './../../Images/food.svg'


class MyButtonsMain extends Component {
constructor(props) {
    super(props)
    this.state = {
        // myChildren: this.props.children.map(Child => <div dir="rtl" className="spaces" >{Child}</div>)     
    }
}
/*
    input: category - name of a categoty by which the function filters places
    method: this method sets a new filtered places array to render by the given category 
*/
  searchByCategory = (category) => {
    const {setFilteredSearch,searchFunction,placesList} = this.props;
    setFilteredSearch(searchFunction(placesList,category))
   }

    render() {
        return (
            <div dir="rtl" className="main-buttons" align="center">
                {/* {this.state.myChildren} */}
                <div dir="rtl" className="spaces" >
                <MyButton clickHandler={() =>this.searchByCategory("clothing")} buttonName="clothing" buttonStyle="mybtn--clothing--solid" buttonSize="mybtn--medium"><img className="main-button-img" src={clothing_icon}/> ביגוד</MyButton>
                </div>
                <div dir="rtl" className="spaces" >
                <MyButton clickHandler={() =>this.searchByCategory("employment")} buttonName="employment" buttonStyle="mybtn--employment--solid" buttonSize="mybtn--medium"><img className="main-button-img" src={jobs_icon}/> תעסוקה</MyButton>
                </div>
                <div dir="rtl" className="spaces" >
                <MyButton clickHandler={() =>this.searchByCategory("lodging")} buttonName="lodging" buttonStyle="mybtn--lodging--solid" buttonSize="mybtn--medium"><img className="main-button-img" src={lodging_icon}/> לינה</MyButton>
                </div>
                <div dir="rtl" className="spaces" >
                <MyButton clickHandler={() =>this.searchByCategory("food")} buttonName="food" buttonStyle="mybtn--food--solid" buttonSize="mybtn--medium"><img className="food-img" src={food_icon}/> מזון</MyButton>
                </div>
                <div dir="rtl" className="spaces" >
                <MyButton clickHandler={() =>this.searchByCategory("violence")} buttonName="violence" buttonStyle="mybtn--violence--solid" buttonSize="mybtn--medium"><img className="violence-img" src={violence_icon}/> אלימות במשפחה</MyButton>       
                </div>
                <div dir="rtl" className="spaces" >
                <MyButton clickHandler={() =>this.searchByCategory("firstAid")} buttonName="firstAid" buttonStyle="mybtn--aid--solid" buttonSize="mybtn--medium"><img className="first-aid-img" src={first_aid_icon}/> עזרה רפואית / נפשית</MyButton>           
                </div>
                <div dir="rtl" className="spaces" >
                <MyButton clickHandler={() =>this.searchByCategory("rehab")} buttonName="rehab" buttonStyle="mybtn--rehab--solid" buttonSize="mybtn--medium"><img className="main-button-img" src={rehab_icon}/> גמילה</MyButton>       
                </div>
                {/* <MyButton clickHandler={() =>this.searchByCategory()} buttonName="" buttonStyle="mybtn--reset--solid" buttonSize="mybtn--medium">איפוס חיפוש </MyButton>        */}
            </div>
        )
    }
}

export default MyButtonsMain
