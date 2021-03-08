import React, {Component, useEffect} from 'react'
import './hotlinesadmin.css'
import Search from '../Search/NewSearch'
import * as hotlinesService from './HotlinesService'
import addButton from '../../Images/Hotlines/add-icon.svg'
import {withRouter} from 'react-router-dom';
import { auth } from '../../Firebase/index.js';
import AdminLockedMessagePage from '../Admin/AdminLockedMessagePage'
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs'
import * as HotlineService from './HotlinesService'


class HotlinesAdminPage extends Component {
    constructor(){
        super()
        this.state = {
            hotlinesArray: [],
            hotlinesToRender: [],
            showAdmin: false,
            showNonAdmin: false,
        }

    }
    getHotlineById = (id) => {
        var hotline = HotlineService.getHotlineByID(id, this.state.hotlinesArray);
        if(hotline){
            return hotline;
        }else{
            return null;
        }
    }
    removeHotlineFromArray = (item) =>{
        let index = this.state.hotlinesArray.indexOf(item);
        const temp = this.state.hotlinesArray
        for (let i=0; i<this.state.hotlinesToRender.length; i++){
            if (this.state.hotlinesToRender[i].key === this.state.hotlinesArray[index].hotline_id){
                const temp2 = this.state.hotlinesToRender
                temp2.splice(i,1)
                temp.splice(index, 1)
                this.setState({
                    hotlinesArray: temp,
                    hotlinesToRender: temp2

                })
            }
        }
        return;
        // if item found in the array - delete it and set the state accordingly
        // if(index > -1){
        //     temp.splice(index,1);
        //     this.setState({
        //         hotlinesArray:temp,
        //         hotlinesToRender: this.state.hotlinesToRender
        //     })
        // } סבבה ראית את הבעיה שזה עשה? נראה לי זה הפונקציה הזו
        // return;
    }
    deleteFromHotlinesArray = (id) => {
        var hotlineToDelete = this.getHotlineById(id);
        if (hotlineToDelete){
            this.removeHotlineFromArray(hotlineToDelete)
        }

    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user){
                this.setState({
                    showAdmin: true,
                    showNonAdmin: false
                })
                hotlinesService.getHotlinesArray("hotlines").then(res => {
                    this.setState({hotlinesArray: res})
                    this.setState({hotlinesToRender: hotlinesService.createAdminHotlinesToRender(res, this.deleteFromHotlinesArray)})
                })
            } else {
                this.setState({
                    showAdmin: false,
                    showNonAdmin: true
                })
            }
        })
    }
    // This function takes a filtered arraw of hotlines (only the data) and changes to state to Reflect
    // only hotlines that match the text in the search bar
    filterHotlines = (filteredArr) => {
        this.setState({hotlinesToRender: hotlinesService.createAdminHotlinesToRender(filteredArr, this.deleteFromHotlinesArray)})
    }
    render(){
        // return(
        var adminDisplay = <div className="hotlinesPage">
            <div className="crumbs-admin-hotlines"><BreadCrumbs crumbsLen={2} first="ראשי" firstPath=".././admin" second="מספרי מצוקה"></BreadCrumbs></div>            <div dir="rtl" align="center" className="title">מספרי מצוקה</div>
            <div className="hotlines-wrapper">
            <div className="adminHotlineSearch"><Search className="searchAdminHotlines"
            searchFunc={hotlinesService.searchHotlines} 
            allData={this.state.hotlinesArray}
            filterRenderedFunc={this.filterHotlines}/></div>
            <div className="addHotlineDiv">
                <div className="addButtonDiv">
            <img className="addBtn" src={addButton} onClick={()=>{
            this.props.history.push("./hotlines-add");
            }}/>
            </div>
            </div>
            </div>
            <div>
                {this.state.hotlinesToRender}
            </div>
        </div>
        // );
        return(
            <div>
            {this.state.showAdmin && adminDisplay}
            {this.state.showNonAdmin && <AdminLockedMessagePage/>}
            </div>
        );
    }
}

export default withRouter(HotlinesAdminPage);