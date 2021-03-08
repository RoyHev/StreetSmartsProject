import React, { Component } from 'react'
import PlaceView from './PlaceView'
import './PlaceView.css'


class PlaceViewList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             placesToRender : []
        }
    }

    addPlace(){
        const {displayPlaceCardByID} = this.props;
            this.state.placesToRender = this.props.placesList.map((item) =>
            <PlaceView placeType={item.placeType} placeName={item.placeName} placeCity={item.placeCity}
                placeStreet={item.placeStreet} placeBuildingNumber={item.buildingNumber} placePostalCode={item.postalCode}
                placeDescription={item.placeDescription} 
                key={item.id} placeKey={item.id} id={item.id} displayPlaceCardByID={displayPlaceCardByID}
                isIdRequired={item.isIdRequired}  
                doesCriminalRecordFit={item.doesCriminalRecordFit}  
                doesAddictedUsersFit={item.doesAddictedUsersFit} 
                isImmediateService={item.isImmediateService}
                // item id is derived from firebase**** 
                >
            </PlaceView>
            )
            if(this.state.placesToRender.length > 0){
        }return
    }

    render() {
        this.addPlace()        
        return (
            <div className= "flex-container">
                {this.state.placesToRender}
            </div>
        )
    }
}

export default PlaceViewList