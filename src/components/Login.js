import React, { Component } from "react";
import logo from "./images/logo.png";
import banner from "./images/cars.jpg";
import fire from "./Fire";
import firebase from "firebase";
import "./Login.css";
import { BrowserRouter as Redirect, Link } from "react-router-dom";
import NavBarLogin from "./NavBarLogin";

class Login extends Component {
	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
		this.state = {
			email: "",
			password: "",
			redirect: "",
		};
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	//logs in...changes error message depending on result
	login(e) {
		e.preventDefault();
		fire
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then((u) => {
				console.log("logged in");
				//if logged in go to Inventory page
				this.props.history.push("/Inventory");
				console.log(this.state.redirect);
			})
			.catch((error) => {
				console.log(error);
				var e = error.message;
				var x = document.getElementById("error");
				//set error message on screen
				x.innerHTML = error;
			});
	}
	//log in with google provider, make sure google is enabled in the firebase auth console.
	glogin = () => {
		var provider = new firebase.auth.GoogleAuthProvider();
		fire
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				/** @type {fire.auth.OAuthCredential} */
				var credential = result.credential;

				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				console.log("logged in");
				//if logged in go to Inventory page
				this.props.history.push("/Inventory");
				console.log(this.state.redirect);
				// ...
			})
			.catch((error) => {
				console.log(error);
			});
		// [END auth_google_signin_popup]
	};

	render() {
		//can delete...was trying to redirect pages this way
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />;
		}

		return (
			<>
				{/*Top Login/Register navigation bar*/}
				<NavBarLogin />

				{/*Navigation Bar*/}
				<nav className="navBar">
					<div className="navbar-container">
						<img className="logo" src={logo}></img>
						<Link>
							<a href="/" className="active">
								Home
							</a>
						</Link>
						{/*selected page*/}
						{/* We eventually need to remove this data section. This is for testing. */}
						{/* <Link to="/Data"><a href ="/Data" className="data">Data</a></Link> */}
						<Link to="/Inventory">
							<a href="/Inventory" className="inventory">
								Inventory
							</a>
						</Link>
						<Link to="/#">
							<a href="/#" className="inventory">
								Contact
							</a>
						</Link>
					</div>
				</nav>

				{/*Car banner with blur*/}
				<div className="bannerblur">
					<img src={banner}></img>
				</div>

				{/*Login form*/}
				<div className="loginform">
					<h1 className="loginfont">Log In:</h1>
					<label for="email">
						<b>Email</b>
					</label>{" "}
					<br></br>
					<input
						value={this.state.email}
						onChange={this.handleChange.bind(this)}
						type="text"
						name="email"
						class="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Enter email"
					/>
					<br></br>
					<label for="psw">
						<b>Password</b>
					</label>
					<input
						value={this.state.password}
						onChange={this.handleChange.bind(this)}
						type="password"
						name="password"
						class="form-control"
						id="exampleInputPassword1"
						placeholder="Password"
					/>
					<button type="submit" onClick={this.login} class="btn btn-primary">
						Login
					</button>
					<br></br>
					<br></br>
					<label for="error" id="error"></label>
					<div className="container signin">
						<p className="bformtext">
							Don't have an account?{" "}
							<Link to="/Register">
								<a href="/Register" className="registercolor">
									Register
								</a>{" "}
							</Link>{" "}
						</p>

						<p className="bformtext">
							Login/Signup with{" "}
							<Link>
								<a className="registercolor" onClick={this.glogin}>
									Google
								</a>{" "}
							</Link>{" "}
						</p>
					</div>
				</div>

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

export default Login;
