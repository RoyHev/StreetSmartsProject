import React, { Component } from 'react'
import './PlaceView.css'
import aidIcon from '../../Images/PlaceView/tagCard-FirstAid.svg'
import clothesIcon from '../../Images/PlaceView/tagCard-clothes.svg'
import lodgingIcon from '../../Images/PlaceView/tagCard-bed.svg'
import foodIcon from '../../Images/PlaceView/tagCard-food.svg'
import workIcon from '../../Images/PlaceView/tagCard-jobs.svg'
import violenceIcon from  '../../Images/PlaceView/tagCard-Violence.svg'
import mentalHealthIcon from '../../Images/PlaceView/tagCard-Mental.svg'
import addicted from '../../Images/PlaceView/addicted.svg'
import exConvict from '../../Images/PlaceView/exConvict.svg'
import idNeeded from '../../Images/PlaceView/idNeeded.svg'
import immidiate from '../../Images/PlaceView/immidiate.svg'
import EllipsisText from 'react-ellipsis-text'

class PlaceView extends Component {

    constructor(props,name,description,location,type,key) {
        super(props)
        this.placeName=name;
        this.placeDescription=description;
        this.placeCity=location;
        this.placeType=type;
        this.key=key


        this.state = {
            userDetailsMessages:[
                addicted,
                exConvict,
                idNeeded,
                immidiate,
            ],
        }
        
    }
    titleStyle = {
        right: '1%',
        position: 'relative',
        paddingBottom: '1vh',
        direction: 'rtl',
        fontFamily: "'Alef', sans-serif",
        fontSize: '16px',
        color: '#263d43',
    }

    findIcon(){
        if (this.props.placeType === "firstAid"){  
            return aidIcon
        }
        else if(this.props.placeType === "clothing"){
            return clothesIcon
        }
        else if(this.props.placeType === "lodging"){
            return lodgingIcon
        }
        else if(this.props.placeType === "food"){
    
            return foodIcon
        }
        
        else if(this.props.placeType === "employment"){ 
            return workIcon
        }
        else if(this.props.placeType === "violence"){ 
            return violenceIcon
        }

        else if(this.props.placeType === "rehab"){ 
            return mentalHealthIcon
        }
        //
    }

userDetailToRender = (acceptanceTerms) => {
    let termsToDiv=[]
    const{ userDetailsMessages } = this.state;
    for (let index = 0; index < acceptanceTerms.length; index++) {
        const term =acceptanceTerms[index];
        if(term)
        {
            termsToDiv.push(
                <img key={index} className="featur1eStyle" src={userDetailsMessages[index]}/>
             
                )
         }
    }
    return termsToDiv;
}

    onPlaceClick = () => {
        const {displayPlaceCardByID, id} = this.props;
        displayPlaceCardByID(id)
    }

    render()
    {
        const  values= this.props;
        
        const terms = [values.isIdRequired,
            values.doesCriminalRecordFit,
            values.doesAddictedUsersFit,
            values.isImmediateService
            ]
const userDetailsDivs = this.userDetailToRender(terms)


       return (
           <div className="mainPlaceViewDiv" onClick={this.onPlaceClick}>
             <div className="placeNameTitle">
                 <EllipsisText text={this.props.placeName} length={35}/>
            </div>
               <div dir='rtl' className="place-div">
               <EllipsisText className="placeDescriptionEli" text={this.props.placeDescription} length={35}/>
             </div>
               <div  className="iconStyle">
               <img className="iconStyleImg" src={this.findIcon()}/>
               </div>
               <div className="container">
               <div dir='rtl' className="container withAddress">{this.props.placeCity} {", רח'"} {this.props.placeStreet} {" "} {this.props.placeBuildingNumber}</div>               
               <div className="placeViewIcons">
                   
                    {userDetailsDivs}
                   
                </div>
             
                </div>
        </div>
       )
    }

}

export default PlaceView