import React, { Component } from 'react'
import './OpeningHours.css'
import progress_bar from './../../Images/PlaceForm/progress4.svg'
import chevron_right from './../../Images/PlaceForm/chevron-right.svg'
import chevron_left from './../../Images/PlaceForm/chevron-left.svg'

class OpeningHours extends Component {

    continue = (event) => {

        event.preventDefault();
        this.props.nextStep();
    }

    goBack = (event) => {
        event.preventDefault();
        this.props.previousStep();
    }

    /*
        method: disables and unchecks all the days' checkboxes
    */
    disableDaysCheckboxes = () => {
        // holds all the days checkboxes
        var daysHoursArr = document.getElementsByClassName("place-daily-hours") 
        Array.from(daysHoursArr).forEach((element) => {
            element.disabled = true
            element.checked = false
        })       
    }

    /*
        method: enables all the days' checkboxes
    */
    enableDaysCheckboxes = () => {
        // holds all the days checkboxes
        var daysHoursArr = document.getElementsByClassName("place-daily-hours") 
        Array.from(daysHoursArr).forEach((element) => {
            element.disabled = false
        })
    }

    /*
        method: disables all the opening hours inputs
    */
    disableHoursInputs = () =>{
        // holds all the input elements
        var workingHoursArr = document.getElementsByTagName('input')
        const hoursInputsCommonName = "-day-hours"
        Array.from(workingHoursArr).forEach((element) => {
            if(element.className.includes(hoursInputsCommonName)){
                element.disabled = true
            }
        })
    }

    

    /*
    method: sets all the days' opening hours to 23:59-23:59
   */
    setNoOpeningHours = () => {
        var workingHoursArr = document.getElementsByTagName('input')
        const hoursInputsCommonName = "-day-hours"
        Array.from(workingHoursArr).forEach((element) => {
            if(element.className.includes(hoursInputsCommonName)){
                if(element.id.includes('hours')){
                    element.value= "23"
                }
                else if(element.id.includes('minutes')){
                    element.value= "59"
                }
            }
            // if(element.className.includes(hoursInputsCommonName)){
            //     element.disabled = true
            // }
        })
    }

    /*
        method: sets all the days' opening hours to 00:00-23:59
    */
    setWorkingAllTheTime = () => {
        var workingHoursArr = document.getElementsByTagName('input')
        const hoursInputsCommonName = "-day-hours"
        Array.from(workingHoursArr).forEach((element) => {
            if(element.className.includes(hoursInputsCommonName)){
                if(element.id.endsWith('start')){
                    element.value= "00"
                }
                else if(element.id.endsWith('end')){
                    if(element.id.includes('hours')){
                        element.value= "23"
                    }
                    else if(element.id.includes('minutes')){
                        element.value= "59"
                    }
                }
            }
        })

    }

    /*
        method: this method handles the disabling and the enabling of the days checkboxes, 
                and the disabling of the opening hours inputs. in addition, if the user
                clicks "contact later" then set all hours to 23:59, else if "open 24/7" is clicked
                then the place is open from 00:00 to 23:59 everyday.
    */
    radioHandler = () => {
        // if the user clicks "contact later" or "open 24/7" then: disable and uncheck
        // the days checkboxes, and disable all the inputs that describe the opening hours 
        
        if(document.getElementById('contact-later').checked){    
            this.setNoOpeningHours()
            this.disableDaysCheckboxes();
            this.disableHoursInputs();
            // set all days' opening hours to 23:59
            this.props.setHoursLater();
        }
        else if(document.getElementById('always-open').checked){
            this.setWorkingAllTheTime();
            this.disableDaysCheckboxes();
            this.disableHoursInputs();
            // set all days' opening hours from 00:00 to 23:59
            this.props.setAlwaysOpenHours();
        } 
        // o.w.: if "manually hours typing" is clicked then enable the days checkboxes 
        else{
            this.setNoOpeningHours();
            // set all days' opening hours to 23:59
            this.props.setHoursLater();
            this.enableDaysCheckboxes();
        }
        this.props.radioOnCheck('openingHoursRadiosState',)
    }

    /*
        input: dayName - the day checkbox's name which was clicked
        method: once a day checkbox is clicked by the user, the method enables and
                disables the opening hours inputs alternatively
    */
    onCheckboxClick = (dayName) => {
        var element = document.getElementById(dayName)
        var elementsClass = element.name + '-hours'
        Array.from(document.getElementsByClassName(elementsClass)).forEach((e) => {
            e.disabled = !e.disabled
        })
    }

    // TODO: make handle change all placeholders (try change placeholder to defaultvalue)
    render() {
        const { values, handleChange, openingHoursRadiosState} = this.props
        const SUNDAY=0, MONDAY=1, TUESDAY=2, WEDNESDAY=3, THURSDAY=4, FRIDAY=5, SATURDAY=6;
        return (
            <div className="fullHoursPage">
                <div>{this.props.breadCrumb}</div>    
            <div dir="rtl" className="opening-hours-wrapper">
                <div align="right">
                    <label className="title">שעות פתיחה</label>
                </div>
                <div className="radio-hours-check">
                    {/* <img className="requiredFill" src={required}/> */}
                    <input type="radio" className="hours-radio-class" id="contact-later" name="hours-radio"
                           onClick={() => {this.radioHandler();
                                            this.props.radioOnCheck('openingHoursRadiosState','contact-later');}}
                           defaultChecked={openingHoursRadiosState['contact-later']}
                            />
                    <label htmlFor="contact-later" className="pageLabel">צור קשר לקבלת שעות פתיחה</label>
                </div>
                <div className="radio-hours-check">
                <input type="radio" id="always-open" name="hours-radio" className="hours-radio-class"
                       onClick={() => {this.radioHandler(); 
                        this.props.radioOnCheck('openingHoursRadiosState','always-open');}}
                        defaultChecked={openingHoursRadiosState['always-open']} />
                    <label htmlFor="always-open" className="pageLabel">פתוח כל הזמן</label>
                </div>
                <div className="radio-hours-check">
                <input type="radio" id="manually" name="hours-radio" className="hours-radio-class"
                       onClick={() => {this.radioHandler();
                                        this.props.radioOnCheck('openingHoursRadiosState','manually');}}
                       defaultChecked={openingHoursRadiosState['manually']} />
                    <label htmlFor="manually" className="pageLabel">הזן שעות ידנית</label>
                </div>
                <div>
                    <input className="place-daily-hours" type="checkbox"
                            id="sunday-day" name="sunday-day" disabled={true} value="??????"
                            onChange={(e) => this.onCheckboxClick(e.target.name)} />
                    <label className="pageLabel" htmlFor="sunday-day">יום א'</label>
                </div>
                <div dir="ltr">
                    <input className="sunday-day-hours" type="text" id="sunday-hours-start"
                             disabled={true} min="0" max="23" maxLength="2" onChange={handleChange(SUNDAY,'openHour')} 
                             defaultValue={values.openingHours[SUNDAY].openHour}/>:
                    <input className="sunday-day-hours" type="text" id="sunday-minutes-start"
                            disabled={true} min="0" max="59" maxLength="2" onChange={handleChange(SUNDAY,'openMinutes')}
                             defaultValue={values.openingHours[SUNDAY].openMinutes}/>-
                    <input className="sunday-day-hours" type="text" id="sunday-hours-end"
                             disabled={true} min="0" max="23" maxLength="2" onChange={handleChange(SUNDAY,'closeHour')}
                              defaultValue={values.openingHours[SUNDAY].closeHour}/>:
                    <input className="sunday-day-hours" type="text" id="sunday-minutes-end"
                            disabled={true} min="0" max="59" maxLength="2" onChange={handleChange(SUNDAY,'closeMinutes')}
                             defaultValue={values.openingHours[SUNDAY].closeMinutes}/>
                </div>
                <div>
                    <input className="place-daily-hours" type="checkbox"
                        id="monday-day" name="monday-day" disabled={true} value="??????"
                        onChange={(e) => this.onCheckboxClick(e.target.name)} />
                    <label className="pageLabel" htmlFor="monday-day">יום ב'</label>
                </div>
                <div dir="ltr">
                    <input className="monday-day-hours" type="text" id="monday-hours-start"
                             disabled={true} min="0" max="23" maxLength="2" onChange={handleChange(MONDAY,'openHour')}
                              defaultValue={values.openingHours[MONDAY].openHour}/>:
                    <input className="monday-day-hours" type="text" id="monday-minutes-start"
                            disabled={true} min="0" max="59" maxLength="2" onChange={handleChange(MONDAY,'openMinutes')}
                             defaultValue={values.openingHours[MONDAY].openMinutes}/>-
                    <input className="monday-day-hours" type="text" id="monday-hours-end"
                            disabled={true} min="0" max="23" maxLength="2" onChange={handleChange(MONDAY,'closeHour')}
                             defaultValue={values.openingHours[MONDAY].closeHour}/>:
                    <input className="monday-day-hours" type="text" id="monday-minutes-end"
                            disabled={true} min="0" max="59" maxLength="2" onChange={handleChange(MONDAY,'closeMinutes')}
                             defaultValue={values.openingHours[MONDAY].closeMinutes}/>
                </div>
                <div>
                    <input className="place-daily-hours" type="checkbox"
                            id="tuesday-day" name="tuesday-day" disabled={true} value="??????"
                            onChange={(e) => this.onCheckboxClick(e.target.name)} />
                    <label className="pageLabel" htmlFor="tuesday-day">יום ג'</label>
                </div>
                <div dir="ltr">
                    <input className="tuesday-day-hours" type="text" id="tuesday-hours-start"
                             disabled={true} min="0" max="23" maxLength="2" onChange={handleChange(TUESDAY,'openHour')}
                              defaultValue={values.openingHours[TUESDAY].openHour}/>:
                    <input className="tuesday-day-hours" type="text" id="tuesday-minutes-start"
                            disabled={true} min="0" max="59" maxLength="2" onChange={handleChange(TUESDAY,'openMinutes')}
                             defaultValue={values.openingHours[TUESDAY].openMinutes}/>-
                    <input className="tuesday-day-hours" type="text" id="tuesday-hours-end"
                            disabled={true} min="0" max="23" maxLength="2" onChange={handleChange(TUESDAY,'closeHour')}
                             defaultValue={values.openingHours[TUESDAY].closeHour}/>:
                    <input className="tuesday-day-hours" type="text" id="tuesday-minutes-end"
                            disabled={true} min="0" max="59" maxLength="2" onChange={handleChange(TUESDAY,'closeMinutes')}
                             defaultValue={values.openingHours[TUESDAY].closeMinutes}/>
                </div>
                <div>
                    <input className="place-daily-hours" type="checkbox"
                            id="wednesday-day" name="wednesday-day" disabled={true} value="??????"
                            onChange={(e) => this.onCheckboxClick(e.target.name)} />
                    <label className="pageLabel" htmlFor="wednesday-day">יום ד'</label>
                </div>
                <div dir="ltr">
                    <input className="wednesday-day-hours" type="text" id="wednesday-hours-start"
                             disabled={true} min="0" max="23" maxLength="2" onChange={handleChange(WEDNESDAY,'openHour')}
                              defaultValue={values.openingHours[WEDNESDAY].openHour}/>:
                    <input className="wednesday-day-hours" type="text" id="wednesday-minutes-start"
                            disabled={true} min="0" max="59" maxLength="2" onChange={handleChange(WEDNESDAY,'openMinutes')}
                             defaultValue={values.openingHours[WEDNESDAY].openMinutes}/>-
                    <input className="wednesday-day-hours" type="text" id="wednesday-hours-end"
                             disabled={true} min="0" max="23" maxLength="2" onChange={handleChange(WEDNESDAY,'closeHour')}
                              defaultValue={values.openingHours[WEDNESDAY].closeHour}/>:
                    <input className="wednesday-day-hours" type="text" id="wednesday-minutes-end"
                            disabled={true} min="0" max="59" maxLength="2" onChange={handleChange(WEDNESDAY,'closeMinutes')}
                             defaultValue={values.openingHours[WEDNESDAY].closeMinutes}/>
                </div>
                <div>
                    <input className="place-daily-hours" type="checkbox"
                            id="thursday-day" name="thursday-day" disabled={true} value="??????"
                            onChange={(e) => this.onCheckboxClick(e.target.name)} />
                    <label className="pageLabel" htmlFor="thursday-day">יום ה'</label>
                </div>
                <div dir="ltr">
                    <input className="thursday-day-hours" type="text" id="thursday-hours-start"
                             disabled={true} min="0" max="23" maxLength="2" onChange={handleChange(THURSDAY,'openHour')}
                              defaultValue={values.openingHours[THURSDAY].openHour}/>:
                    <input className="thursday-day-hours" type="text" id="thursday-minutes-start"
                            disabled={true} min="0" max="59" maxLength="2" onChange={handleChange(THURSDAY,'openMinutes')}
                             defaultValue={values.openingHours[THURSDAY].openMinutes}/>-
                    <input className="thursday-day-hours" type="text" id="thursday-hours-end"
                             disabled={true} min="0" max="23" maxLength="2" onChange={handleChange(THURSDAY,'closeHour')}
                              defaultValue={values.openingHours[THURSDAY].closeHour}/>:
                    <input className="thursday-day-hours" type="text" id="thursday-minutes-end"
                            disabled={true} min="0" max="59" maxLength="2" onChange={handleChange(THURSDAY,'closeMinutes')}
                             defaultValue={values.openingHours[THURSDAY].closeMinutes}/>
                </div>
                <div>
                    <input className="place-daily-hours" type="checkbox"
                            id="friday-day" name="friday-day" disabled={true} value="??????"
                            onChange={(e) => this.onCheckboxClick(e.target.name)} />
                    <label className="pageLabel" htmlFor="friday-day">יום ו'</label>
                </div>
                <div dir="ltr">
                    <input className="friday-day-hours" type="text" id="friday-hours-start"
                             disabled={true} min="0" max="23" maxLength="2" onChange={handleChange(FRIDAY,'openHour')}
                              defaultValue={values.openingHours[FRIDAY].openHour}/>:
                    <input className="friday-day-hours" type="text" id="friday-minutes-start"
                            disabled={true} min="0" max="59" maxLength="2" onChange={handleChange(FRIDAY,'openMinutes')}
                             defaultValue={values.openingHours[FRIDAY].openMinutes}/>-
                    <input className="friday-day-hours" type="text" id="friday-hours-end"
                             disabled={true} min="0" max="23" maxLength="2" onChange={handleChange(FRIDAY,'closeHour')}
                              defaultValue={values.openingHours[FRIDAY].closeHour}/>:
                    <input className="friday-day-hours" type="text" id="friday-minutes-end"
                            disabled={true} min="0" max="59" maxLength="2" onChange={handleChange(FRIDAY,'closeMinutes')}
                             defaultValue={values.openingHours[FRIDAY].closeMinutes}/>
                </div>
                <div>
                    <input className="place-daily-hours" type="checkbox"
                            id="saturday-day" name="saturday-day" disabled={true} value="??????"
                            onChange={(e) => this.onCheckboxClick(e.target.name)} />
                    <label className="pageLabel" htmlFor="saturday-day">יום שבת</label>
                </div>
                <div dir="ltr">
                    <input className="saturday-day-hours" type="text" id="saturday-hours-start"
                             disabled={true} min="0" max="23" maxLength="2" onChange={handleChange(SATURDAY,'openHour')}
                              defaultValue={values.openingHours[SATURDAY].openHour}/>:
                    <input className="saturday-day-hours" type="text" id="saturday-minutes-start"
                            disabled={true} min="0" max="59" maxLength="2" onChange={handleChange(SATURDAY,'openMinutes')}
                             defaultValue={values.openingHours[SATURDAY].openMinutes}/>-
                    <input className="saturday-day-hours" type="text" id="saturday-hours-end"
                             disabled={true} min="0" max="23" maxLength="2" onChange={handleChange(SATURDAY,'closeHour')}
                              defaultValue={values.openingHours[SATURDAY].closeHour}/>:
                    <input className="saturday-day-hours" type="text" id="saturday-minutes-end"
                            disabled={true} min="0" max="59" maxLength="2" onChange={handleChange(SATURDAY,'closeMinutes')}
                             defaultValue={values.openingHours[SATURDAY].closeMinutes}/>
                </div>
                {/* <div>
                    <button onClick={this.goBack}>חזור</button>
                </div>
                <div>
                    <button onClick={this.continue}> המשך</button>
                </div>
                <div align="center" className="progress-bar"><img src={progress_bar}/></div> */}
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

export default OpeningHours
