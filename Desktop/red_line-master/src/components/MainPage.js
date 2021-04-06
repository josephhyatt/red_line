import React, {Component, useState}  from 'react';
import logo from './images/logo.png';
import banner from './images/cars.jpg';
import './MainPage.css'
import { BrowserRouter as Link } from 'react-router-dom';
import fire from './Fire'
class MainPage extends Component{
    

    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }


    logout(){
        fire.auth().signOut();
    }

  handleSuccessfulAuth(data) {
    this.props.history.push("/dashboard");
  }



    render(){
    return (
        <>
        {/*Top Login/Register navigation bar*/}
            <nav className = "topNav">
                <div className = "topNav-container">
                <button type="submit" onClick={this.logout} class="btn btn-primary" text="Logout">Logout</button>
                <Link to="/Register"><a href ="/Register"className="Register">Register</a></Link>
		        <Link to="/Login"><a href ="/Login" className="login">Login</a></Link>
                </div>
            </nav>

        {/*Navigation Bar*/}
            <nav className = "navBar">
                <div className = "navbar-container">
                 <img className = "logo" src={logo} ></img>
                 <Link to="/"><a href= "/" className="active">Home</a></Link> {/*selected page*/}
                 {/* We eventually need to remove this data section. This is for testing. */}
                 <Link to="/Data"><a href ="/Data" className="data">Data</a></Link>
		         <Link to="/Inventory"><a href ="/Inventory" className="inventory">Inventory</a></Link>
		         <a>Contact</a>
                </div>
            </nav>

        {/*Car banner*/}
            <div className = "banner">
            <img src={banner} width="1904px" height="600px"></img>
            </div>

        {/*Search bar*/}
    <form className="CarSearch" role="search">
        <div className="form-group">
            <input type="text" className="searchform" placeholder="Enter Keyword"/>
            <button type = "submit" className = "Submit" > Search </button>
        </div>
    </form>

        {/*Footer*/}
        <footer className = "footer">

		<div>
			<a>© 2021 Team Red Line. All rights reserved.</a>
			<a>About Red Line</a>
			<a>Contact Red line</a>
	  	</div>

	    </footer>

        </>
    );
}
}

export default MainPage;
