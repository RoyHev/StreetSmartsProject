import React, { Component } from 'react'
import 'react-responsive-modal/styles.css';
import './Success.css'
import {withRouter} from 'react-router-dom';
import PlaceCard from '../PlaceView/PlaceCard'
import * as PlacesService from '../PlaceView/PlacesService.js'



class Success extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            showCard: false,
        }
    }

    continue = (event) => {
        const { values, isEditMode } = this.props
        event.preventDefault();
        // this function will perform add new place to DB or edit an existing place
        // according to the purpose it is called
        this.props.formCompleteHandler(values);
        // if(!isEditMode){
        //     PlacesService.addNewPlaceToDB(values)
        // }else{
        //     PlacesService.updatePlace(values)
        // }
        this.props.history.push("./");
        // this.props.nextStep();
    }

    goBack = (event) => {
        event.preventDefault();
        
        this.props.previousStep();
    }

    onShowCard = () => {
        this.setState({ showCard : !this.state.showCard });
    }

    render() {
        const { values } = this.props;
        const {showCard} = this.state;
        return (
            <div className="sucessDiv">
                <button onClick={this.goBack}>חזור</button>
                <button onClick={this.continue}>
                    הוסף מקום חדש ושמור
                </button>

                <button onClick={()=> this.onShowCard()}>
                    צפה בכרטיסייה
                    {showCard ?
                    <PlaceCard values={values} onCloseCard={this.onShowCard} /> :
                    null
                    }
                </button>
            </div>
        )
    }
}

export default withRouter (Success)
