import React from 'react'
import NewHotlineFirst from './NewHotlineFirst'
import NewHotlineSecond from './NewHotlineSecond'
import HotlineCardReviewPage from './HotlineCardReviewPage'
import * as HotlinesService from './HotlinesService'
import {withRouter} from 'react-router-dom'
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs'

class NewHotlinePage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            serviceName: '',
            serviceInfo: '',
            servicePhone: '',
            serviceTags: [],
            step: 1,
            isUpdate: false,
        }
    }
    // go to the next step
    nextStep = () => {
        const {step} = this.state;
        this.setState({step : step + 1})
    }

    // go back to the previous step
    previousStep = () => {
    const {step} = this.state;
    this.setState({step : step - 1})        
    }
    /*
    input: string fieldName - describes a state's field.
    method: the method sets the given state's field to the value of the invoking event 
    */
    handleChange = (fieldName) => (event) => {
        this.setState({[fieldName]:event.target.value})
        
    }

    handleTags = (tags, fieldName) => {
        this.setState({[fieldName]: tags})

    }

    saveHotline = () => {
        if (this.state.isUpdate){
            HotlinesService.updateHotline(this.props.match.params.id, this.state.serviceName, this.state.serviceInfo, this.state.serviceTags, this.state.servicePhone)
            alert("updated")
        } else {
            HotlinesService.addHotlineToDB(this.state.serviceName, this.state.serviceInfo, this.state.serviceTags, this.state.servicePhone)
            alert("Added")
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        // If id is undefined, we are adding a new hotline
        if (id == null){
            this.setState({
                step: 1,
                isUpdate: false,
            })
        // else, we are editing and we need to set the component's state to fit the hotline we are editing.
        } else {
            HotlinesService.getHotlineValuesById(id).then(res => {
                this.setState({
                    step: 1,
                    isUpdate: true,
                    serviceName: res[0].title,
                    serviceInfo: res[0].information,
                    servicePhone: res[0].phone,
                    serviceTags: res[0].tags,
                })
            })
        }
    }
    render(){
        const {serviceName, serviceInfo, servicePhone, serviceTags, step, isUpdate} = this.state;
        const values = {serviceName, serviceInfo, servicePhone, serviceTags, isUpdate};
        switch(step){
            case 1:
                return(
                    <NewHotlineFirst
                    nextStep={this.nextStep} 
                    previousStep={this.previousStep}
                    handleChange={this.handleChange}
                    values={values}
                    />
                );
            case 2:
                return(
                    <NewHotlineSecond
                    nextStep={this.nextStep} 
                    previousStep={this.previousStep}
                    handleChange={this.handleChange}
                    handleTags={this.handleTags}
                    saveHotline={this.saveHotline}
                    values={values}
                    />
                );
            case 3:
                return(
                    <HotlineCardReviewPage
                    hotline_id={1}
                    serviceInfo={this.state.serviceInfo}
                    serviceName={this.state.serviceName}
                    serviceInfo={this.state.serviceInfo}
                    servicePhone={this.state.servicePhone}
                    previousStep={this.previousStep}
                    saveHotline={this.saveHotline}
                    />
                );
        }
    }
}

export default withRouter(NewHotlinePage);