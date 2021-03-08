import React from 'react'
import './search.css'
import cancelIcon from '../../Images/cancelIcon.svg'
import mapIcon from '../../Images/searchIcon/location-icon.svg'
import filterIcon from '../../Images/searchIcon/filter-icon.svg'

// import searchIcon from '../Images/search-icon.png';


class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // holds the search query
       searchText:''
    }
  }
    
  /*
    input: event - submit clicked
    method: this method won't render once submit clicked and will call the given handler from parent
  */
  submitHandler = (event) => {
    //  event.preventDefault()
    //  const {setFilteredSearch,searchFunction,placesList} = this.props;
    //  setFilteredSearch(searchFunction(placesList,this.state.searchText))
    }

    /*
      input: event - onChange
      method: sets the filter text to the given event's text
    */
    searchChangeHandler = (event) => {
    const {setFilteredSearch,searchFunction,placesList} = this.props;
     this.setState({searchText: event.target.value},() =>
     setFilteredSearch(searchFunction(placesList,this.state.searchText)))
    }

    cancelHandler = () => {
      const {setFilteredSearch,searchFunction,placesList} = this.props;
      this.setState({searchText: ""}, ()=>{
        setFilteredSearch(searchFunction(placesList,this.state.searchText))
      })
    }

    render(){
        return (
            <div dir="rtl" className="topnav">
              {/* <form onSubmit={this.submitHandler}> */}
                <div className="search-div">
                <input dir="rtl" type="text" className="my-search" name="search" value={this.state.searchText}
                 onChange={this.searchChangeHandler} placeholder="חיפוש...">
                </input>
                <img className="search-side-icons" src={mapIcon}/>
                <img className="search-side-icons" src={filterIcon}/>
                </div>

                {/* once the user clicks the "X" icon the handler clears the search bar filter  */}
                {/* <span className="cancel-icon" onClick={this.cancelHandler}><img src={cancelIcon}></img></span> */}
                {/* <input className="submit-btn" type="submit" value="חפש"/> */}
              {/* </form> */}
            </div>
        );
    }
}

export default Search;




