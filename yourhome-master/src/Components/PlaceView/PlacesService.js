import firebase from "../../Firebase"
const db  = firebase.firestore();

export function getPlacesFromDB(DB_name) {
    var places = [];
    return db.collection(DB_name).get().then((table) => {
        table.docs.forEach(doc => {
            var myDoc = doc.data();
            myDoc["id"] = doc.id;
            places.push(myDoc)
        })
        return places;
    })
}

/*
    input: places - array which consists of all the places in the DB
           filter - a string which describes the query to filter by
    method: returns a list of places which the filter is found in their names/ address/ description
*/
export function getPlacesByFilter(places,filter) {
    var tempArray = [];
    places.forEach(place => {
        if(place.placeName.includes(filter) || place.placeCity.includes(filter) || 
                place.placeDescription.includes(filter) || place.placeStreet.includes(filter) ||
                place.postalCode === filter){
            tempArray.push(place)
        }
    });
    return tempArray;
}

/*
    input: places - array which consists of all the places in the DB
           filter - a string which describes the type to filter by
    method: returns a list of places with the same type as the filter ones
*/
export function getPlacesByTypes (places, filter) {
    var tempArray = []
    // find all the places with the corresponding Type
    places.forEach(element => {
        if(element.placeType === filter){
            tempArray.push(element)
        }
    });
    return tempArray;        
}
export function editPlace(place){
    db.collection('places').doc(place.id).update({
        placeType: place.placeType,
        subCategory: place.subCategory,
        contactName: place.contactName,
        contactPhoneNo: place.contactPhoneNo,
        placeName: place.placeName,
        placeDescription: place.placeDescription,
        placeCity: place.placeCity,
        placeStreet:place.placeStreet,
        buildingNumber: place.buildingNumber,
        postalCode: place.postalCode,
        openingHours:place.openingHours,
        agesRange:place.agesRange,
        gender: place.gender,
        uniquePopulations:place.uniquePopulations,
        wellFareRecognition: place.wellFareRecognition,
        isIdRequired: place.isIdRequired,
        doesCriminalRecordFit: place.doesCriminalRecordFit,
        doesAddictedUsersFit: place.doesAddictedUsersFit,
        isImmediateService: place.isImmediateService,
        latitude: place.latitude,
        longitude: place.longitude,
    })
}
export function addNewPlaceToDB(newPlace) {
    db.collection('places').add({
        placeType: newPlace.placeType,
        subCategory: newPlace.subCategory,
        contactName: newPlace.contactName,
        contactPhoneNo: newPlace.contactPhoneNo,
        placeName: newPlace.placeName,
        placeDescription: newPlace.placeDescription,
        placeCity: newPlace.placeCity,
        placeStreet:newPlace.placeStreet,
        buildingNumber: newPlace.buildingNumber,
        postalCode: newPlace.postalCode,
        openingHours:newPlace.openingHours,
        agesRange:newPlace.agesRange,
        gender: newPlace.gender,
        uniquePopulations:newPlace.uniquePopulations,
        wellFareRecognition: newPlace.wellFareRecognition,
        isIdRequired: newPlace.isIdRequired,
        doesCriminalRecordFit: newPlace.doesCriminalRecordFit,
        doesAddictedUsersFit: newPlace.doesAddictedUsersFit,
        isImmediateService: newPlace.isImmediateService,
        latitude: newPlace.latitude,
        longitude: newPlace.longitude,
    })
}

export function getPlaceByID(id, places){
    var ret = {};
    places.forEach(place => {
        if(place.id === id){
            ret = (place);
            return ret;
        }
    });
    return ret;
}

export function removePlaceByID(id){ 
    // const placecId = this.props.placeKey;
    db.collection('places').doc(id).delete();
}    