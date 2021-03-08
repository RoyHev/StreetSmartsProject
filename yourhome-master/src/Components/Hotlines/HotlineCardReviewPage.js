import React from 'react'
import './hotlinecard.css'
import HotlineComponent from './HotlineComponent'
import {withRouter, Link} from 'react-router-dom'
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs'

class HotlineCardReviewPage extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        const {serviceInfo, serviceName, servicePhone} = this.props;
        return(
            <div className="cardPage">
                <div className="crumbs-hotlines-review"><BreadCrumbs crumbsLen={3} first="ראשי" firstPath=".././admin" second="מספרי מצוקה" secondPath='.././hotlines-admin' third="תצוגה מקדימה"/></div>
                <HotlineComponent
                hotline_id={1}
                information={serviceInfo}
                hotlineTitle={serviceName}
                subTitle={serviceInfo}
                phone={servicePhone}
                />
                <div align="center" className="buttonDiv">
                    <Link to="/hotlines-admin"><button className="saveButton" onClick={() => this.props.saveHotline()}>שמירה</button></Link>
                    <button className="showCardButton" onClick={()=> {this.props.previousStep()}}>חזרה לעריכה</button></div>

            </div>
        );
    }
}

export default withRouter(HotlineCardReviewPage);