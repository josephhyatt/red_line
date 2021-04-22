import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import fire from "./components/Fire";
import MainPage from "./components/MainPage";
import Register from "./components/Register";
import Login from "./components/Login";
import Inventory from "./components/Inventory";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Vehicle from "./components/Vehicle";
class App extends Component {
	constructor() {
		super();
		this.state = {
			user: null,
			loggedInStatus: "NOT_LOGGED_IN",
		};
		this.authListener = this.authListener.bind(this);
	}

	componentDidMount() {
		this.authListener();
	}

	authListener() {
		fire.auth().onAuthStateChanged((user) => {
			console.log(user);
			if (user) {
				this.setState({ user });
				localStorage.setItem("user", user.uid);
			} else {
				this.setState({ user: null });
				localStorage.removeItem("user");
			}
		});
	}

	render() {
		return (
			<>
				<Router>
					<Switch>
						<Route
							exact
							path={"/"}
							render={(props) => (
								<MainPage
									{...props}
									loggedInStatus={this.state.loggedInStatus}
								/>
							)}
						/>
						<Route
							exact
							path={"/Login"}
							render={(props) => <Login {...props} />}
						/>
						<Route
							exact
							path={"/Register"}
							render={(props) => <Register {...props} />}
						/>
						<Route
							exact
							path={"/Inventory"}
							render={(props) => <Inventory {...props} />}
						/>

						<Route
							path="/car/:make/:model/:id"
							component={Vehicle}
							render={(props) => <itemDetail {...props} id={this.state.id} />}
						/>
					</Switch>
				</Router>
			</>
		);
	}
}

export default App;
