import React, { Component } from 'react';
import Toolbar from './Components/Menu/Toolbar'
import './App.css';
import "@reach/menu-button/styles.css";
import Backdrop from './Components/Menu/Backdrop'
import {BrowserRouter as Router , Switch ,Route} from 'react-router-dom';
import SideDrawer from './Components/Menu/SideDrawer.js';
import * as PlacesService from './Components/PlaceView/PlacesService.js';
import PlacesPage from './Components/PlaceView/PlacesPage.js';
import NewPlaceForm from './Components/AddNewPlace/NewPlaceForm'
import AdminLogin from './Components/Admin/AdminLogin'
import AddNewAdmin from './Components/Admin/AddNewAdmin'
import HotlinesUsers from './Components/Hotlines/HotlineUsers'
import HotlinesAdminPage from './Components/Hotlines/HotlinesAdminPage'
import ContactForm from './Components/Contact/ContactForm'
import MailSent from './Components/Contact/MailSent'
import NewFooter from './Components/Footer/NewFooter'
import TalkPanel2 from './Components/TalkPanel/Talk'
import NewHotlineFirst from './Components/Hotlines/NewHotlineFirst'
import NewHotlinePage from './Components/Hotlines/NewHotlinePage'
import NewHotlineSecond from './Components/Hotlines/NewHotlineSecond'
import AdminHomepage from './Components/Admin/AdminHomepage'
import AdminLockedMessagePage from './Components/Admin/AdminLockedMessagePage';

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      // orders if the menu is open or not
      sideDrawerOpen: false,
      placeToEdit: undefined,
    }
  }

  /*
    method: this method is invoked once the menu button is clicked and changes the
    visibility of the menu.
  */
  menuDrawerClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    });
  };



  menuBackdropClickHandler = () => {
    this.setState({sideDrawerOpen: false})
  }

  // this method invokes a form component which enables adding a new place.
  // the component passes a handler which will be invoked once the admin completes the form.
  newPlaceFormRoute = (props) => {
    return(
      <NewPlaceForm
          // placeToEdit={this.state.placeToEdit}
          formCompleteHandler={(newPlace)=>PlacesService.addNewPlaceToDB(newPlace)}
      />
    )
  }

  editPlaceFormRoute = (props) => {
    return(
      <NewPlaceForm
          placeToEdit={this.state.placeToEdit}
          formCompleteHandler={(place)=>PlacesService.editPlace(place)}
      />
    )
  }

  setPlaceToEdit = (place) => {
    this.setState({placeToEdit:place})
  }

   adminPageRoute = (props) => {
    return(
      <AdminHomepage setPlaceToEdit={this.setPlaceToEdit}></AdminHomepage>
    )
  }


  render(){
    let backDrop;
    if (this.state.sideDrawerOpen){
      backDrop = <Backdrop click={this.menuBackdropClickHandler}/>
    }
    return (
      <Router>
      <div className="appDiv">
        <header>
        <Toolbar dir="rtl" drawerClickHandler={this.menuDrawerClickHandler}></Toolbar>
        <SideDrawer drawerClickHandler={this.menuDrawerClickHandler} show={this.state.sideDrawerOpen}/>
        {backDrop}
        {/* <div className="spacer" style={{height: '10vh'}}></div> */}
        </header>

      <Switch>
      <Route path="/add-new-admin" exact component={AddNewAdmin}/>
      <Route path="/contact-us" exact component={ContactForm}/>
      <Route path="/admin-login" exact component={AdminLogin}/>
      <Route path="/mail-sent" exact component={MailSent}/>
      <Route path="/hotlines" exact component={HotlinesUsers}/>
      <Route path="/hotlines-admin" exact component={HotlinesAdminPage}/>
      {/* <Route path="/hotlines-add/:id" exact component={NewHotlinePage}/> */}
      <Route path="/hotlines-edit/:id" exact component={NewHotlinePage}/>
      <Route path="/hotlines-add" exact component={NewHotlinePage}/>
      <Route path="/no-permissions" exact component={AdminLockedMessagePage}/>
      <Route path="/hotlines-add-two" exact component={NewHotlineSecond}/>
      <Route path="/add-new-place" exact render={this.newPlaceFormRoute} />
      <Route path="/edit-place" exact render={this.editPlaceFormRoute} />
      <Route path="/admin" exact render={this.adminPageRoute}/>
      <Route path="/" exact>
      <div className="searchHere">חפשו עזרה קרובה</div>
        <section>
        <PlacesPage/>        
          <div className="talkPanelDiv">
            <TalkPanel2/>
          </div>
        </section>
      </Route>
     </Switch>
     <footer>
        <NewFooter/>
      </footer>
    </div>
    </Router>
    );
  }
}
export default App;