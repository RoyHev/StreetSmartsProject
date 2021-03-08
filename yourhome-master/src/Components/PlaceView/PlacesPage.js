import React, { Component } from 'react'
import PlaceViewList from './PlaceViewList.js'
import Search from '../Search/Search.js'
import * as PlacesService from './PlacesService.js'
import MyButtonsMain from '../Buttons/MyButtonsMain'
import PlaceCard from './PlaceCard'
import './PlacePage.css'


class PlacesComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             placesArray: [],
             placesToRender: [],
             showCard: false,
             clickedPlace : {},
             showNoSearch: false,
             placesMapInfo: [],
        }
    }

    setPlacesToRender = (places) => {
        this.setState({placesToRender:places})
        if (places.length === 0){
            this.setState({
                showNoSearch: true
            })
        } else {
            this.setState({
                showNoSearch: false
            })

        }
    }
    clearSearch = () => {
        this.setPlacesToRender(this.state.placesArray)
    }
    componentDidMount(){
        PlacesService.getPlacesFromDB("places").then(res => {
            const placesMapArr = res.filter(place => place.longitude != null && place.latitude != null).map(
                ({longitude, latitude, placeName, placeStreet, buildingNumber, placeCity}) => 
                ({longitude, latitude, placeName, placeStreet, buildingNumber, placeCity})
            )
            this.setState({
                placesArray: res,
                placesToRender:res,
                placesMapInfo: placesMapArr, 
            })
            if (this.state.placesToRender.length === 0){
                this.setState({
                    showNoSearch: true
                })
            } else {
                this.setState({
                    showNoSearch: false
                })
            }
        })
    }

    onShowCard = () => {
        this.setState({ showCard : !this.state.showCard });
    }

    getPlaceById = (id) => {
        var place = PlacesService.getPlaceByID(id, this.state.placesToRender);
        if(place){
            return place;
        }else{
            return null;
        }
    }

    displayPlaceCardByID = (id) =>{
        let place = this.getPlaceById(id);
        if(place){
            this.setState({clickedPlace:place},this.onShowCard())
        }else{
            return null;
        }
    }

    removeItemFromStateArr = (item, arrName) =>{
        const temp = this.state[arrName];
        let index = temp.indexOf(item);
        // if item found in the array - delete it and set the state accordingly
        if(index > -1){
            temp.splice(index,1);
            this.setState({[arrName]:temp})
        }
        return;
    }

    removePlaceByID = (id) => {
        let place = this.getPlaceById(id);
        if(place){
            //removes place from DB
            PlacesService.removePlaceByID(id);
            // if the clicked place still in the state's places Array - delete it
            // (the state's places array will be synced with the DB every refresh)
            this.removeItemFromStateArr(place,"placesArray");
        }else{
            return null;
        }
    }

    editPlaceByID = (id) => {
        // get the id place according to the open place card
        const place = this.getPlaceById(id);
        const {setPlaceToEdit} = this.props
        // if a match place was found in the places array - assign that palce for editing
        //  at /add-new-place via App.js
        if(place){
            setPlaceToEdit(place)
            this.props.routeToAddPlace();
        }
        //TODO it in SUCCESS
        // remove the editing assignment of this place  
        // setPlaceToEdit(undefined)
    }

    render() {
        const {showCard, clickedPlace} = this.state;
        const {placesArray, placesToRender, placesMapInfo} = this.state;
        const {isadmin} = this.props;
        var noSearch = <div className="noSearchItems" dir='rtl' align="center">לא נמצאו ערכים להצגה</div>
        return (
            <div>
                <div className="searchBox">
                <Search setFilteredSearch={this.setPlacesToRender} placesList={placesArray}
                        searchFunction={PlacesService.getPlacesByFilter}>
                </Search>
                </div>
                <div className="butonsHomepage">
                <MyButtonsMain placesList={placesArray} setFilteredSearch={this.setPlacesToRender}
                               searchFunction={PlacesService.getPlacesByTypes}/>
                </div>
                <div>
                    {showCard ?
                        <PlaceCard
                            isadmin={isadmin} values={clickedPlace}
                            removePlaceByID={this.removePlaceByID} placesMapInfo={placesMapInfo}
                            onCloseCard={this.onShowCard} editPlaceByID={this.editPlaceByID}
                        />
                    :null
                    }
                </div>
                <div align="center" className="search-results-label">
                    תוצאות חיפוש
                </div>
                <div align="left" className="clearSearch" onClick={this.clearSearch}>איפוס סינון</div>
                <div align="center" className="grayLine"></div>
                {(this.state.placesToRender.length === 0) && this.state.showNoSearch && noSearch}
                <PlaceViewList
                    placesList={placesToRender}
                    displayPlaceCardByID={this.displayPlaceCardByID}>
                </PlaceViewList>
            </div>
        )
    }
}

export default PlacesComponent
