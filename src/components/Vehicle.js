import React from "react";
import logo from "./images/logo.png";
import "./Vehicle.css";
import { BrowserRouter as Link } from "react-router-dom";
import NavBarLogin from "./NavBarLogin";
import NavBarPages from "./NavBarPages";
import fire from "./Fire";
import FavButton from "./FavButton";


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

			<NavBarPages />

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
					{/* THIS NEEDS STYLING */}
					<br></br>
					<FavButton car={car}/>	
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
