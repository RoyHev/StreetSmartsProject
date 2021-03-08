import './newsearch.css'
// import './search.css'
import React, {Component} from 'react'
import cancelIcon from '../../Images/cancelIcon.svg'

export default class NewSearch extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchText: '',
            active: false,

        }
    }
    /*
      input: event - onChange
      method: sets the filter text to the given event's text
    */
   searchChangeHandler = (event) => {
    this.setState({searchText: event.target.value},() =>{
        if (this.state.searchText.length != 0){
            this.setState({active: true})
            this.props.filterRenderedFunc(this.props.searchFunc(this.state.searchText, this.props.allData))
        } else {
            this.setState({active: false})
            this.props.filterRenderedFunc(this.props.allData)
        }
        
    })
   }

   cancelHandler = () => {
     this.setState({searchText: ""}, ()=>{
        this.setState({active: false})
        this.props.filterRenderedFunc(this.props.allData)
     })
   }
    render(){
        return(
            <div dir="rtl" className="topnav" align="center">
                <input dir="rtl" type="text" className="my-newsearch" name="search" value={this.state.searchText}
                 onChange={this.searchChangeHandler} placeholder="חיפוש...">
                </input>
                {/* once the user clicks the "X" icon the handler clears the search bar filter  */}
            <span className={this.state.active? "my-cancel-icon flip": "my-cancel-icon"} onClick={this.cancelHandler}><img className="delete-text-icon" src={cancelIcon}/></span>
            </div>
        );
    }
}