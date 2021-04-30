import React, { Component } from "react";
import "./MainPage.css";
import { BrowserRouter as Link } from "react-router-dom";
import fire from "./Fire";

class NavBarLogin extends Component {
	logout() {
		fire.auth().signOut();
	}

	checkLogIn() {
		const user = fire.auth().currentUser;
		if (user) {
			return (
				<>
					<Link>
						<a onClick={this.logout} href="/Login" className="Register">
							Logout
						</a>
					</Link>
					<Link to="/Profile">
							<a href="/Profile" className="Profile">
								Profile
							</a>
					</Link>
				</>
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
				<nav className="topNav">
					<div className="topNav-container">{this.checkLogIn()}</div>
				</nav>
			</>
		);
	}
}

export default NavBarLogin;
