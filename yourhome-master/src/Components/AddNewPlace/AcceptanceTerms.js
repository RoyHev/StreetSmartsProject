import React, { Component } from 'react'
import './AcceptanceTerms.css'
import progress_bar from './../../Images/PlaceForm/progress6.svg'
import chevron_right from './../../Images/PlaceForm/chevron-right.svg'
import chevron_left from './../../Images/PlaceForm/chevron-left.svg'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom';
import PlaceCard from '../PlaceView/PlaceCard'

class AcceptanceTerms extends Component {
    constructor(props){
        super(props)
        this.state = {
            showCard: false,
        }
    }
    
    continue = (event) => {
        // event.preventDefault();
        this.props.nextStep();
    }
    saveNewPlace = (event) => {
        // event.preventDefault();
        const {values} = this.props;
        this.props.formCompleteHandler(values);
        this.props.history.push("./admin");
    }
    onShowCard = () => {
        this.setState({ showCard : !this.state.showCard });
    }

    goBack = (event) => {
        event.preventDefault();
        this.props.previousStep();
    }
    
    render() {
        const { values, handleChange } = this.props
        const {showCard} = this.state;
        return (
            <div>
            <div className="acceptanceDiv">
            <div>{this.props.breadCrumb}</div>
            <div dir="rtl" className="acceptance-terms-wrapper">
                <div>
                    <label className="title">תנאי קבלה</label>
                </div>
                
                <div>
                    <label className="acceptance-label">יש צורך בתעודה מזהה</label>
                </div>
                <div className="acceptance-slider-div">
                    <label className="toggle">
                        <input className="toggleCheckbox" defaultChecked={values.isIdRequired}
                               type="checkbox" onChange={handleChange('isIdRequired')} />
                        <span className="slider"></span>
                    </label>
                </div>
                
                <div>
                    <label className="acceptance-label">מתאים לבעלי עבר פלילי</label>
                </div>
                <div className="acceptance-slider-div">
                    <label className="toggle">
                        <input className="toggleCheckbox" type="checkbox"
                               defaultChecked={values.doesCriminalRecordFit}
                               onChange={handleChange('doesCriminalRecordFit')} />
                        <span className="slider"></span>
                    </label>
                </div>
                <div>
                    <label className="acceptance-label">מתאים למכורים משתמשים</label>
                </div>
                <div className="acceptance-slider-div">
                    <label className="toggle">
                        <input className="toggleCheckbox" type="checkbox"
                               defaultChecked={values.doesAddictedUsersFit}
                               onChange={handleChange('doesAddictedUsersFit')} />
                        <span className="slider"></span>
                    </label>
                </div>
                <div>
                    <label className="acceptance-label">קבלת שירות מיידי (בשעות פתיחה)</label>
                </div>
                <div className="acceptance-slider-div">
                    <label className="toggle">
                        <input className="toggleCheckbox" type="checkbox"
                               defaultChecked={values.isImmediateService}
                               onChange={handleChange('isImmediateService')} />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
            <div align="center" className="acceptance-buttons">
                    <Link to="/admin"><button className="saveButton" onClick={() => this.saveNewPlace()}>שמירה</button></Link>
                    <button className="showCardButton" onClick={()=> this.onShowCard()}>לצפייה בכרטיס
                    {showCard ?
                    <PlaceCard values={values} onCloseCard={this.onShowCard} /> :
                    null
                    }
                    </button></div>
                <div className="progress-bar" align="center">
                <img className="form-left-chevron" src={chevron_left} onClick={this.goBack} />
                    <img className="progress-bar-img" src={progress_bar}/>
                    <img className="form-right-chevron" id="terms-unable-chevron" src={chevron_right} />
                </div>
                </div>
                </div>
            
        )
    }
}

export default withRouter (AcceptanceTerms)
