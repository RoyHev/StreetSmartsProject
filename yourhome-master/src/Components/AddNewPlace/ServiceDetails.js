import React, { Component } from 'react'
import './ServiceDetails.css'
import progress_bar from './../../Images/PlaceForm/progress2.svg'
import chevron_right from './../../Images/PlaceForm/chevron-right.svg'
import chevron_left from './../../Images/PlaceForm/chevron-left.svg'
import required from '../../Images/required.svg'

class ServiceDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             placeNameError:"",
             placeDescriptionError:"",
        }
    }
    
    isValid = () => {
        const {values} = this.props;
        let placeNameError="";
        let placeDescriptionError="";
        if(values.placeName === ""){
             placeNameError = "*הכנס שם שירות"
        }
        if(values.placeDescription === ""){
            placeDescriptionError = "*הכנס תיאור שירות"
        }
        if(placeNameError || placeDescriptionError){
            this.setState({
                placeNameError:placeNameError,
                placeDescriptionError:placeDescriptionError,
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
        const {placeNameError,placeDescriptionError} = this.state;
        const { values, handleChange } = this.props
        return (
            <div dir="rtl" className="service-details-wrapper">
                <div>{this.props.breadCrumb}</div>
                <div>
                    <label className="title">פרטי השירות</label>
                </div>
                <div className="service-details-margin">
                <div className="add-new-place-error service-details-error">
                    {placeNameError}
                </div>
                <img className="requiredFill Categ" src={required}/>
                <div className="add-new-place-div">
                    <label className="pageLabel label-margin">שם השירות</label>
                    <input
                        dir="rtl" type="text" id="details-service-name" className="new-place-input" name="service-name"
                        placeholder="הכנס שם שירות" onChange={handleChange('placeName')}
                        defaultValue={values.placeName} >
                    </input>
                </div>
                <div className="add-new-place-error service-details-error">
                    {placeDescriptionError}
                </div>
                <img className="requiredFill Categ" src={required}/>
                <div className="add-new-place-div">
                    <label className="pageLabel label-margin" style={{"display":"relative","verticalAlign":"top", "top":"50%"}}>תיאור השירות</label>
                    <textarea
                        dir="rtl" className="new-place-input" name="service-description" id="details-service-description"
                        placeholder="הכנס תיאור" onChange={handleChange('placeDescription')}
                        defaultValue={values.placeDescription} style={{"display":"relative", "height":"15vh"}} >
                    </textarea>
                </div>
                <div/>
                <div className="progress-bar" align="center">
                    <img className="form-right-chevron" src={chevron_right} onClick={this.continue} />
                    <img className="progress-bar-img" src={progress_bar}/>
                    <img className="form-left-chevron" src={chevron_left} onClick={this.goBack} />
                </div>
                </div>
            </div>
        )
    }
}

export default ServiceDetails
