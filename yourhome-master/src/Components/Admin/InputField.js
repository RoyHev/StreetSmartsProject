import React, {Component} from 'react'
import './inputfields.css'


class InputField extends Component {
    render(){
        return(
            <input 
            className="inputText"
            dir="rtl" onChange={this.props.changeFunc}
            id={this.props.identifier}
            type={this.props.inputType} 
            placeholder={this.props.fieldText}>
            </input>
        );
    }

}

export default InputField;