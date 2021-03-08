import React, {Component} from 'react'
import './hotlines.css'
import Search from '../Search/NewSearch'
import * as hotlinesService from './HotlinesService'
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs'

class HotlineUsers extends Component {
    constructor(){
        super()
        this.state = {
            hotlinesArray: [],
            hotlinesToRender: [],
        }

    }
    componentDidMount(){
        hotlinesService.getHotlinesArray("hotlines").then(res => {
            this.setState({hotlinesArray: res})
            this.setState({hotlinesToRender: hotlinesService.createHotlinesToRender(res)})
        })
    }
    // This function takes a filtered arraw of hotlines (only the data) and changes to state to Reflect
    // only hotlines that match the text in the search bar
    filterHotlines = (filteredArr) => {
        this.setState({hotlinesToRender: hotlinesService.createHotlinesToRender(filteredArr)})
    }
    render(){
        return(
            <div className="hotlinesPage">
                <div align="right" className="crumbs-hotlines"><BreadCrumbs crumbsLen={2} first="ראשי" firstPath=".././" second="מספרי מצוקה"></BreadCrumbs></div>
                <div dir="rtl" align="center" className="title">מספרי מצוקה</div>
                <div className="searchDiv" align="center" dir='rtl'><Search 
                searchFunc={hotlinesService.searchHotlines} 
                allData={this.state.hotlinesArray}
                filterRenderedFunc={this.filterHotlines}/></div>
                <div>
                    {this.state.hotlinesToRender}
                </div>
            </div>
        );
    }
}

export default HotlineUsers;