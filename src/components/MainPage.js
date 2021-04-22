import React, { Component } from "react";
import banner from "./images/cars.jpg";
import "./MainPage.css";
import { BrowserRouter as Link } from "react-router-dom";
import fire from "./Fire";
import NavBarLogin from "./NavBarLogin";
import NavBarPages from "./NavBarPages";
import SearchPage from"./SearchPage";

class MainPage extends Component {
	constructor(props) {
		super(props);

		this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
	}

	logout() {
		fire.auth().signOut();
	}

	handleSuccessfulAuth(data) {
		this.props.history.push("/dashboard");
	}

	checkLogIn() {
		const user = fire.auth().currentUser;
		if (user) {
			return (
				<Link>
					<a onClick={this.logout} href="#" className="Register">
						Logout
					</a>
				</Link>
			);
		} else {
			return (
				<>
					<Link to="/Register">
						<a href="/Register" className="Register">
							Register
						</a>
					</Link>
					<Link to="/Login">
						<a href="/Login" className="login">
							Login
						</a>
					</Link>
				</>
			);
		}
	}

	render() {
		return (
			<>
				{/*Top Login/Register navigation bar*/}
				<NavBarLogin />

				<NavBarPages />

				{/*Car banner*/}
				<div className="banner">
					<img src={banner}></img>
				</div>

				{/*Search bar*/}
				{/* <form className="CarSearch" role="search">
        <div className="searchflexcontainer">
            <input type="text" className="searchform" placeholder="Enter Keyword"/>
            <button type = "submit" className = "Submit" > Search </button>
        </div>
    </form> */}
				<SearchPage/>

				{/*Footer*/}
				<footer className="footer">
					<div>
						<p>© 2021 Team Red Line. All rights reserved.</p>
					</div>
				</footer>
			</>
		);
	}
}

export default MainPage;
