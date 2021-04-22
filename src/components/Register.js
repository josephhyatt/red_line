import React, { Component} from "react";
import logo from "./images/logo.png";
import banner from "./images/cars.jpg";
import fire from "./Fire";
import "./Register.css";
import { BrowserRouter as Link } from "react-router-dom";

class Register extends Component {
	constructor(props) {
		super(props);
		this.register = this.register.bind(this);
		this.state = {
			email: "",
			password: "",
		};
	}

	register(e) {
		e.preventDefault();
		fire
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then((u) => {
				console.log("Account made");
				var x = document.getElementById("error");
				//says account is created....
				x.innerHTML = "Account created";
				var db = fire.firestore();
				const user = fire.auth().currentUser;
				//makes database object for the user in collection 'userInfo'....priv set to 0 for management priveleges
				return db.collection("userInfo").doc(user.uid).set({
					id: user.uid,
					priv: 0,
					email: user.email,
				});
			})
			.then((u) => {
				console.log(u);
			})
			.catch((error) => {
				console.log(error);
				var e = error.message;
				var x = document.getElementById("error");

				x.innerHTML = error;
			});
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		return (
			<>
				{/*Top Login/Register navigation bar*/}
				<nav className="topNav">
					<div className="topNav-container">
						<Link to="/Register">
							<a href="/Register" className="login">
								Register
							</a>
						</Link>
						<Link to="/About">
							<a href="/Login" className="login">
								Login
							</a>
						</Link>
					</div>
				</nav>

				{/*Navigation Bar*/}
				<nav className="navBar">
					<div className="navbar-container">
						<img className="logo" src={logo}></img>
						<Link to="/">
							<a href="/" className="active">
								Home
							</a>
						</Link>{" "}
						{/*selected page*/}
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

				{/*Registration box*/}
				<div className="registerform">
					<h1 className="registerfont">Create an Account:</h1>
					<p>Please fill in this form to create an account.</p>

					<label for="email">
						<b>Email</b>
					</label>
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

					<button
						type="submit"
						className="btn btn-primary"
						onClick={this.register}
					>
						Create Account
					</button>
					<br></br>
					<br></br>
					<label for="error" id="error"></label>

					<div className="container signin">
						<p className="bformtext">
							Already have an account?{" "}
							<Link to="/Login">
								<a href="/Login" className="signincolor">
									Sign in
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

export default Register;
