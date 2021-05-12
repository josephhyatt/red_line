import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import fire from "./components/Fire";
import MainPage from "./components/MainPage";
import Register from "./components/Register";
import Login from "./components/Login";
import Inventory from "./components/Inventory";
import Data from "./components/Data";
import DataM from "./components/DataM";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Vehicle from "./components/Vehicle";
import PrivateRoute, {
	EmployeeRoute,
	ManagerRoute,
} from "./components/PrivateRoute";
import { AuthProvider } from "./components/Auth";
import Profile from "./components/Profile";
import AddPage from "./components/AddPage";
import AdminPage from "./components/AdminPage";
import AddEmployee from "./components/AddEmployee";
import UpdateCar from "./components/UpdateCar";
import Contact from "./components/Contact";

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
							exact
							path={"/Contact"}
							render={(props) => <Contact {...props} />}
						/>
						{/* Speculating on the best location of this element, this causes general slow down on the website.
								Originally, this wrapped the whole router*/}
						<AuthProvider>
							<PrivateRoute exact path={"/Profile"} component={Profile} />

							<EmployeeRoute exact path={"/Data"} component={Data} />

							<EmployeeRoute exact path={"/eAddVehicle"} component={AddPage} />

							<ManagerRoute exact path={"/DataM"} component={DataM} />

							<ManagerRoute exact path={"/AddVehicle"} component={AddPage} />

							<EmployeeRoute exact path={"/UpdateCar"} component={UpdateCar} />

							<ManagerRoute
								exact
								path={"/AddEmployee"}
								component={AddEmployee}
							/>
							<ManagerRoute exact path={"/Employees"} component={AdminPage} />
							{/* If this dynamic vehicle page is not in AuthProvider, it won't load
									perhaps some sort of cookie problem? */}
							<Route
								path="/car/:make/:model/:id"
								component={Vehicle}
								render={(props) => <itemDetail {...props} id={this.state.id} />}
							/>
						</AuthProvider>
					</Switch>
				</Router>
			</>
		);
	}
}

export default App;
