import React from "react";
import logo from "./images/logo.png";
import "./Vehicle.css";
import { BrowserRouter as Link } from "react-router-dom";
import NavBarLogin from "./NavBarLogin";

const Vehicle = ({
	location: {
		state: { car },
	},
}) => {
	const imgpath = "https://" + car.image;
	return (
		<>
			{/*Top Login/Register navigation bar*/}
			<NavBarLogin />

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
					<Link to="#">
						<a href="#" className="inventory">
							Contact
						</a>
					</Link>
				</div>
			</nav>

			<div className="details">
				<div className="big-img">
					<h2>
						{car.year} {car.make} {car.model}
					</h2>{" "}
					{/* Product Title*/}
					<img src={imgpath} alt="Picture of Car" />
				</div>

				<div className="box">
					<ul className="specs"></ul>
					<li>Fuel: {car.fuelType} </li> {/*Side Panel Info Description*/}
					<li>Mileage: {car.mileage}</li>
					<li>Price: ${car.price}</li>
					<div className="row">
						<span>Price: ${car.price}</span> {/*Price Tag*/}
						<p>{car.moreDetails}</p>
					</div>
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
};

export default Vehicle;
