import React, {Component} from 'react'
import './inputs.css'


class ContactInputs extends Component {
    render(){
        return(
            <input 
            className="inputTextContact"
            dir="rtl" 
            onChange={this.props.changeFunc}
            id={this.props.identifier}
            type={this.props.inputType} 
            placeholder={this.props.fieldText}
            name={this.props.n}
            value={this.props.val}>
            </input>
        );
    }

}

export default ContactInputs;