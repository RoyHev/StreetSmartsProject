import React, {Component} from 'react'
import './adminhome.css'
import {withRouter} from 'react-router-dom';
import { auth, db } from '../../Firebase/index.js';
import PlacesPage from '../PlaceView/PlacesPage.js';
import AdminLockedMessagePage from './AdminLockedMessagePage';

class AdminHomepage extends Component{
    constructor(props) {
        super(props)
        this.state = {
            showAdmin: false,
            showNonAdmin: false,
            userName: '',
        }
    }

    addNewPlaceRouter = () => {
        this.props.history.push("./add-new-place")
    }

    editExistingPlaceRouter = () => {
        this.props.history.push("./edit-place")
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user){
                this.setState({
                    showAdmin: true,
                    showNonAdmin: false
                })
                var email = auth.currentUser.email
                db.collection('Admin').get().then((snapshot) => {
                    snapshot.docs.forEach(doc =>{
                        if (doc.data().email === email){
                            this.setState({userName: doc.data().username})
                        }
                    })
                })
            } else {
                this.setState({
                    showNonAdmin: true,
                     showAdmin: false,
                    })
            }
        })
    }

    render(){
        const {setPlaceToEdit} = this.props;
        var adminDisplay = 
        <div align="center" className="homepage">
        <div dir='rtl' align="center" className="admin-name">שלום {this.state.userName} :)</div>
        
        <PlacesPage isadmin={true} setPlaceToEdit={setPlaceToEdit} routeToAddPlace={this.editExistingPlaceRouter} />
        <div align="center" className="add-button">
            <button dir='rtl' 
            className="additionButton"
            onClick={this.addNewPlaceRouter}>הוסף חדש +</button>
         {/* isadmin={false} */}
        </div>
        </div>
        return(
            <div>
                {this.state.showAdmin && adminDisplay}
                {this.state.showNonAdmin && <AdminLockedMessagePage/>}
            </div>
        );
    }
}

export default withRouter(AdminHomepage);