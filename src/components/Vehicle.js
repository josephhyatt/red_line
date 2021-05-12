import React from "react";
import "./Vehicle.css";
import NavBarLogin from "./NavBarLogin";
import NavBarPages from "./NavBarPages";
import fire from "./Fire";
import FavButton from "./FavButton";

function checkStudent(car) {
	//get the authenticated user...
	const user = fire.auth().currentUser;

	if (user != null) {
		const email = user.email;
		//regular expression for finding some email that ends in .edu
		var exp = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+.edu$");
		//test the validity of the email, return true if ends in .edu
		var result = exp.test(email);
		if (result && car.sPrice != null) {
			//this is where we'd do something with the logic.
			return true;
		}
		return false;
	}
}

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
					<li>Description: {car.moreDetails}</li>
					{/* <li>Price: ${car.price}</li> */}
					<div className="row">
						{!!checkStudent(car) ? (
							<>
								{/* Inline CSS, can remove if you want. */}
								<span
									style={{ "text-decoration": "line-through", color: "black" }}
								>
									Price: ${car.price}
								</span>
								<span>Special Student Price: ${car.sPrice}</span>
							</>
						) : (
							<span>Price: ${car.price}</span>
						)}
					</div>
					{/* THIS NEEDS STYLING */}
					<FavButton car={car} />
				</div>
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />

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
