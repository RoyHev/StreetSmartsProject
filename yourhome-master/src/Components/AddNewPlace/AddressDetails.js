import React, { Component } from 'react'
import './AddressDetails.css'
import progress_bar from './../../Images/PlaceForm/progress3.svg'
import chevron_right from './../../Images/PlaceForm/chevron-right.svg'
import chevron_left from './../../Images/PlaceForm/chevron-left.svg'
import required from '../../Images/required.svg'

class AddressDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             placeCityError:"",
             placeStreetError:"",
             buildingNumberError:"",
             coordinatesError:"",
        }
    }

    isValid = () => {
        const {values, handleChangeByValue} = this.props;
        let placeCityError="";
        let placeStreetError="";
        let buildingNumberError="";
        let coordinatesError="";
        let latitude = values.latitude
        let longitude = values.longitude
        if(isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude))){
            // if the user didn't insert any coordinate, the place location isn't displayed
            if((latitude === null || latitude === "") && (longitude === null || longitude === "")){
                handleChangeByValue("latitude", null);
                handleChangeByValue("longitude", null);
            }else{
                coordinatesError="*עליך להכניס נ.צ. תקין או להשאיר 2 את השדות ריקים";
            }
        }
        // coordinates are valid
        else{
            handleChangeByValue("latitude", parseFloat(latitude));
            handleChangeByValue("longitude", parseFloat(longitude));
        }
        if(values.placeCity === ""){
            placeCityError = "*הכנס עיר"
        }
        if(values.placeStreet === ""){
            placeStreetError = "*הכנס רחוב"
        }
        if(values.buildingNumber === ""){
            buildingNumberError = "*הכנס מס' בית"
        }
        if(placeCityError || placeStreetError || buildingNumberError  || coordinatesError){
            this.setState({
                placeCityError:placeCityError,
                placeStreetError:placeStreetError,
                buildingNumberError:buildingNumberError,
                coordinatesError:coordinatesError,
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

    goBack = (event) => {
        event.preventDefault();
        this.props.previousStep();
    }
    
    render() {
        const {placeCityError,placeStreetError,buildingNumberError, coordinatesError} = this.state
        const { values, handleChange } = this.props
        return (
            <div dir="rtl" className="adressDiv">
                <div>{this.props.breadCrumb}</div>
                <div>
                    <label className="title">כתובת</label>
                </div>
                
                <div dir="rtl" className="address-street-city-wrapper">
                    <div className="add-new-place-div-span">
                        
                        <img className="requiredFill Categ" id="city-required" src={required}/>
                        <div className="add-new-place-error city-error">
                            {placeCityError}
                        </div>
                        <label className="pageLabel label-margin address-city">עיר</label>
                    </div>
                    <div id="adress-city-input">
                        <input
                            dir="rtl" type="text" className="new-place-input" name="place-city"
                            placeholder="הכנס עיר" onChange={handleChange('placeCity')} id="city-name-input"
                            defaultValue={values.placeCity} >
                        </input>
                    </div>
                    <div className="add-new-place-div-span " id="adress-street-label">
                        <div className="add-new-place-error">
                            {placeStreetError}
                        </div>
                        <img className="requiredFill Categ" id="street-required" src={required}/>
                        <label className="pageLabel label-margin address-street">רחוב</label>
                    </div>
                    <div>
                        <input
                            dir="rtl" type="text" className="new-place-input" name="place-street"
                            placeholder="הכנס רחוב" onChange={handleChange('placeStreet')} id="street-name-input"
                            defaultValue={values.placeStreet} >
                        </input>
                    </div>
                </div>
                <div className="add-new-place-error">
                    {buildingNumberError}
                </div>
                <div dir="rtl" className="address-details-wrapper">
                
                <div className="add-new-place-div" style={{"marginBottom":"0"}}>
                    <img className="requiredFill houseNumber" id="house-no-required" src={required}/>
                    <label className="pageLabel label-margin address-building">מספר בית</label>
                </div>
                <div style={{"marginBottom":"0"}}>
                    <label className="pageLabel label-margin " id="new-place-postal-code">מיקוד</label>
                    
                </div>
                <div>
                    <input
                        dir="rtl" type="text" className="new-place-input building-input" name="place-building-no"
                        placeholder="מס' בית" onChange={handleChange('buildingNumber')}
                        defaultValue={values.buildingNumber} >
                    </input>
                </div>
                <div>
                    <input
                        dir="rtl" type="text" className="new-place-input postal-input" name="place-postal-code"
                        placeholder="מיקוד" onChange={handleChange('postalCode')}
                        defaultValue={values.postalCode}  >
                    </input>
                </div>
                <div/>
                </div>
                <div className="add-new-place-error">
                    {coordinatesError}
                </div>
                <div className="adress-coordinates-grid">
                    <div className="add-new-place-div" style={{"marginBottom":"0"}}>
                        <label align="right" className="pageLabel label-margin coordinates-label">
                            הכנס נ.צ. של המיקום. לחישוב: <a href="https://www.latlong.net/" target="_blank">לחץ כאן</a>
                        </label>
                    </div><div>
                    </div>
                </div>
                <div dir="rtl" className="address-details-coordinates">
                <div>
                    <input
                        dir="rtl" type="text" className="new-place-input latitude-input" name="place-latitude"
                        placeholder="קו רוחב (latitude)" onChange={handleChange('latitude')}
                        defaultValue={values.latitude}  >
                    </input>
                </div>
                <div>
                    <input
                        dir="rtl" type="text" className="new-place-input longitude-input" name="place-longitude"
                        placeholder="קו אורך (longitude)" onChange={handleChange('longitude')}
                        defaultValue={values.longitude} >
                    </input>
                </div>
                <div/>
                </div>
                <div className="progress-bar" align="center">
                    <img className="form-right-chevron" src={chevron_right} onClick={this.continue} />
                    <img className="progress-bar-img" src={progress_bar}/>
                    <img className="form-left-chevron" src={chevron_left} onClick={this.goBack} />
                </div>
            </div>
        )
    }
}

export default AddressDetails
