import React, { Component } from 'react'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import './PlaceCard.css'
import cardclothingicon from '../../Images/PlaceCardIcons/card-clothing-icon.svg'
import cardemploymenticon from '../../Images/PlaceCardIcons/card-employment-icon.svg'
import cardfirstAidicon from '../../Images/PlaceCardIcons/card-firstAid-icon.svg'
import cardfoodicon from '../../Images/PlaceCardIcons/card-food-icon.svg'
import cardlodgingicon from '../../Images/PlaceCardIcons/card-lodging-icon.svg'
import cardrehabicon from '../../Images/PlaceCardIcons/card-rehab-icon.svg'
import cardviolenceicon from '../../Images/PlaceCardIcons/card-violence-icon.svg'
import clockIcon from '../../Images/PlaceCardIcons/clock.svg'
import profileIcon from '../../Images/PlaceCardIcons/profile.svg'
import phoneIcon from '../../Images/PlaceCardIcons/phone.svg'
import Icon from '../../Images/PlaceCardIcons/id-needed.svg'
import exConvictIcon from '../../Images/PlaceCardIcons/ex-convict.svg'
import immidiateIcon from '../../Images/PlaceCardIcons/immidiate.svg'
import addictedIcon from '../../Images/PlaceCardIcons/addicted.svg'
import roundEditIcon from '../../Images/PlaceCardIcons/round-edit-button.svg'
import roundDeleteIcon from '../../Images/PlaceCardIcons/round-delete-button.svg'
import mapIcon from '../../Images/PlaceCardIcons/map.svg'
import L from 'leaflet';
// import '../../../node_modules/leaflet/dist/leaflet.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

var myIcon = L.icon({
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
});


class PlaceCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open:true,
            activePlace: null,
            zoom: 15,      
            cardIcons:{
                cardclothingicon:cardclothingicon,
                cardemploymenticon:cardemploymenticon,
                cardfirstAidicon:cardfirstAidicon,
                cardfoodicon:cardfoodicon,
                cardlodgingicon:cardlodgingicon,
                cardrehabicon:cardrehabicon,
                cardviolenceicon:cardviolenceicon
            },
            placeIcon:{},
            userDetailsMessages:[
                [" דרושה תעודה מזהה",Icon],
                [" מתאים לבעלי עבר פלילי",exConvictIcon],
                [" מתאים למכורים משתמשים",addictedIcon],
                [" קבלת שירות מיידי (בשעות הפתיחה)",immidiateIcon],
            ],
        }
    }

componentDidMount(){
    const { values } = this.props
    const { cardIcons } = this.state
    // TODO - in a separate func
    const iconName = 'card' + values.placeType + 'icon'
    if(cardIcons[iconName]){
        this.setState({placeIcon:cardIcons[iconName]})
    }
    else{this.setState({placeIcon:''})}
    return;
}

onCloseModal = () => {
    this.setState({ open: false });
}

userDetailToRender = (acceptanceTerms) => {
    let termsToDiv=[]
    const{ userDetailsMessages } = this.state;
    for (let index = 0; index < acceptanceTerms.length; index++) {
        const term = acceptanceTerms[index];
        var imgClass = "place-card-term-spacer" + index.toString()
        var textClass = "place-card-term" + index.toString()
        var imgStyle = "card-term-icon" + index.toString()
        // alert(imgClass)
        if(term){
            termsToDiv.push(
            <div className="card-term-spacer" key={userDetailsMessages[index][0]}>
                <div className={imgClass}>
                    <img className={imgStyle} src={userDetailsMessages[index][1]}/>
                </div>
                <div className={textClass}>
                    {userDetailsMessages[index][0]}                    
                </div>
            </div>
            )
         }
    }
    return termsToDiv;
}

// this method gets a day object and returns true if the place works
// that day, o.w. (if the place is close that day) false.
doesPlaceOpenByDay = (dayObject) => {
    if(dayObject.openHour === "23" && dayObject.closeHour === "23" &&
        dayObject.openMinutes === "59" && dayObject.closeMinutes === "59"){
            return false;
        }
    return true;
}

// this method gets a day name and a day object and returns a string
// which describes the day and the opening hours of this day
getDayHours = (dayName,dayObject) => {
    return (<div> 
        {/* place-card-spacer-from-icon */}
                <div className="card-extra-day-spacer place-card-days-style">
                    {dayName}
                </div>
                <div className="card-hours-style card-double-spacer">
                {dayObject.closeHour}:{dayObject.closeMinutes} - {dayObject.openHour}:{dayObject.openMinutes}
                </div>
            </div>
            )
}

getDayHoursWithIcon = (dayName,dayObject,icon) => {
    return (<div>
                <div className="place-card-icon-spacer">
                    <img className="card-body-icons" src={icon}/>
                </div>
                <div className="place-card-spacer-from-icon place-card-days-style">
                    {dayName}
                </div>
                <div className="card-hours-style card-double-spacer">
                {dayObject.closeHour}:{dayObject.closeMinutes} - {dayObject.openHour}:{dayObject.openMinutes}
                </div>
            </div>)
}

areSameWrokingHours = (firstDay, secondDay) => {
    if(firstDay.openHour === secondDay.openHour && firstDay.closeHour === secondDay.closeHour &&
        firstDay.openMinutes === secondDay.openMinutes && firstDay.closeMinutes === secondDay.closeMinutes){
            return true;
        }
    return false;
}

//  this func gets index of current day and checks if the following days have
// the same working hours. the func returns the last day in that sequence.
getIndexOfSameHours = (current, end, openingHours) => {
    const curDay = openingHours[current];
    for (var index = current + 1; index < end; index++) {
        var otherDay = openingHours[index]
        if(this.areSameWrokingHours(curDay, otherDay)){
            continue;
        }
        return index-1;
    }
    return end-1;
}

// this method returns a div which describes the daily opening hours
// of the current place
getOpeningHoursDivs = () => {
    const daysNames=['א\'','ב\'','ג\'','ד\'','ה\'','ו\'','שבת',];
    const { values } = this.props;
    const openingHours = values.openingHours;
    var daysDivs = [];
    for (let index = 0; index < openingHours.length; index++) {
        // for documentation of 'openingHours' Object go to NewPlaceForm->initOpeningHours 
        const dayObject = openingHours[index];
        var daysString = daysNames[index]
        const daysAmount = openingHours.length;
        if(this.doesPlaceOpenByDay(dayObject)){
            if((index < daysAmount-1)){
                // gets the last index which represents days sequence with same opening hours
                const sameDayHoursIndex = this.getIndexOfSameHours(index,daysAmount,openingHours)
                if(index !== sameDayHoursIndex){
                    daysString += '-' + daysNames[sameDayHoursIndex];
                    index = sameDayHoursIndex
                }
            }
            if(!daysDivs.length){
                daysDivs.push(<div key={daysString}>
                                {this.getDayHoursWithIcon(daysString,dayObject,clockIcon)}
                              </div>
                )
            }else{
            daysDivs.push(<div key={daysString}>{this.getDayHours(daysString,dayObject)}</div>)
            }
        }
    }
    if(!daysDivs.length){
        daysDivs.push(<div key="contact-later-div"> 
                        <div className="place-card-icon-spacer">
                            <img className="card-body-icons" src={clockIcon}/>
                        </div>
                        <span className="card-text-spacer place-card-days-style">
                                צור קשר לקבלת שעות פתיחה
                        </span>
                      </div>
        )    
    }
    return(
        <div className="main-div place-card-label3">            
                {daysDivs}
            </div>
    )
}

getfooterDiv = (values) => {
    var details = [];
    var inputs=[];
    if(values.subCategory){
        details.push(values.subCategory)
    }if(values.agesRange){
        details.push(values.agesRange)
    }if(values.gender){
        details.push(values.gender)
    }if(values.uniquePopulations){
        details.push(values.uniquePopulations)
    }if(values.wellFareRecognition){
        details.push(values.wellFareRecognition)
    }
    details.forEach(value => {
        inputs.push(
            <button key={value} className="card-footer-element" readOnly >{value}</button>
        )
    });
    return inputs;
}

getcontactNameDiv = (contactName) => {
    if(contactName){
        return(
            <div>
                <div className="place-card-icon-spacer">
                    <img className="card-contact-icon" src={profileIcon}/>
                </div>
                <div className="place-card-spacer-from-icon">
                    {`${contactName}`}
                </div>
            </div>
        )
    }
} 


getPhonesDiv = (contactPhoneNo) => {
    var temp = []
    if(contactPhoneNo.length){
        for (let index = 0; index < contactPhoneNo.length; index++) {
            const phone = contactPhoneNo[index];
            if(index == 0){
                temp.push(
                    <div key={index}>
                        <div className="phone-icon-spacer" key={index}>
                        <img className="card-phone-icon" src={phoneIcon}/>
                        </div>
                        <div className="card-first-phone">
                        <a className="links" href={`tel:${phone}`}>{`${phone}`}</a>
                        </div>
                    </div>
                )
            }
            else{
                temp.push(
                    <div className="place-card-extra-phone" key={index}>
                        <a className="links" href={`tel:${phone}`}>{phone}</a>
                        {/* {phone} */}
                    </div>
                )
            }
        }
    }
    return temp;
} 
    removeThisPlace = (id) => {
        const {removePlaceByID, onCloseCard} = this.props;
        removePlaceByID(id);
        onCloseCard();
    }

    editThisPlace = (id) => {
        const {editPlaceByID, onCloseCard} = this.props;
        editPlaceByID(id);
        onCloseCard();
    }

    getAdminDivAction = (id) => {
        return <div>
                <div>
                    <img className="card-place-edit-icon" src={roundEditIcon}
                        onClick={()=>this.editThisPlace(id)}
                    />
                </div>
                <div>
                    <img
                        className="card-place-delete-icon"
                        src={roundDeleteIcon}
                        onClick={()=>this.removeThisPlace(id)}
                    />
                </div>
            </div>
    }

    render() {
        const { values, onCloseCard, placesMapInfo } = this.props
        const divsOpeningHours = this.getOpeningHoursDivs();
        const {placeIcon, open, activePlace} = this.state;
        const terms = [values.isIdRequired,
                                values.doesCriminalRecordFit,
                                values.doesAddictedUsersFit,
                                values.isImmediateService
                                ]
        const userDetailsDivs = this.userDetailToRender(terms)
        const footerDetails = this.getfooterDiv(values)
        const contactNameDiv = this.getcontactNameDiv(values.contactName)
        const phoneNumberDiv = this.getPhonesDiv(values.contactPhoneNo)
        const adminActionsDiv = this.props.isadmin ? this.getAdminDivAction(values.id) : null 
        return (
            <div className="place-card-wrapper">
                <head>
                </head>
                <Modal 
                classNames={{ modal: "placeModal" }}
                open={open}
                onClose={onCloseCard}
                showCloseIcon={false}
                blockScroll={true}
                center>
                        <div>
                            <img className="card-place-type-icon" src={placeIcon}/>
                        </div>
                        {adminActionsDiv}
                    <div className="closeModal" onClick={()=>{onCloseCard();}}><a>&times;</a></div>
                    <div dir="rtl" className="wrapper">
                        
                        <header className="place-modal-header">
                            <div className="place-card-title">
                                {values.placeName}
                                {/* שם המקום */}
                            </div>
                            <div className="place-card-label1">
                                {values.placeDescription}
                                {/* תיאור המקום תיאור המקום תיאור המקום תיאור המקום תיאור המקום תיאור המקום  */}
                            </div>
                        </header>

                        <main align="right" className="place-modal-main">
                        <div className="card-main-wrapper">
                            <div className="card-relative-position">
                                <div className="main-div">
                                    {divsOpeningHours}
                                </div>
                                <div className="card-phone-nums place-card-label1">
                                    {phoneNumberDiv}
                                </div>
                                <div className="card-contact-name place-card-label1">
                                    {contactNameDiv}
                                </div>

                            </div>
                            <div>
                                <div >
                                    <Map className="place-card-map"
                                        center={
                                            (values.latitude == null || values.longitude == null ) ? 
                                            [32.082532, 34.780884] : [values.latitude +0.00400, values.longitude -0.00400]
                                        }
                                        zoom={this.state.zoom}
                                    >
                                    <TileLayer
                                        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {/* if the card is popped from PlacesPage - then load all the places into the map */}
                                    {(placesMapInfo != null) ? placesMapInfo.map(placeInfo => (
                                        <Marker 
                                            position={[placeInfo.latitude,placeInfo.longitude]}
                                            icon={myIcon} onClick={() => this.setState({activePlace:placeInfo})}>
                                        </Marker>
                                    )):
                                    // o.w. - the card is popped from add new place page or from edit place page -
                                    //  in this case show only the certain place in map (if coordinates were inserted)   
                                    (values.latitude != null && values.longitude != null) ? 
                                    <Marker position={[values.latitude, values.longitude]}
                                            icon={myIcon} onClick={() => this.setState({activePlace:values})}>
                                    </Marker> : <br></br>
                                    }
                                    {activePlace && (
                                        <Popup position={[activePlace.latitude, activePlace.longitude]}
                                                onClose={() => this.setState({activePlace:null})}>
                                            <h3 dir="rtl" align="right">{activePlace.placeName}</h3>
                                            <p dir="rtl" align="right">
                                                {`${activePlace.placeStreet} ${activePlace.buildingNumber},`}
                                                {` ${activePlace.placeCity}`}
                                            </p>
                                        </Popup>
                                    )}
                                </Map>
                                </div>
                                <div className="place-card-adress">
                                {`${values.placeStreet} ${values.buildingNumber},`}
                                {/* </div> */}
                                {/* <div align="right" className="main-div place-card-label1"> */}
                                    {` ${values.placeCity} ${values.postalCode}`}
                                </div>
                            </div>
                            <div>
                                <div className="card-terms-div">
                                    {userDetailsDivs}
                                </div>
                            </div>
                        </div>
                        </main>
                        <footer className="place-modal-footer">
                        <div className="footer-wrapper">
                            {footerDetails}
                        </div>
                        </footer>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default PlaceCard
