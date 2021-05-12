import React from "react";
import "./StudentDeals.css";
import Card from "react-bootstrap/Card";
import fire from "./Fire";
import CardColumns from "react-bootstrap/CardColumns";
import CarInfo from "./CarInfo";
import { makeStyles } from "@material-ui/core/styles";

//This is for material-ui
const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

//Utility to check if the car array is empty, and display aSn error.
function checkNoCars(items) {
	if (items.length <= 0)
		return (
			//This is where we return the error and style it here.
			<div>No vehicles found in search.</div>
		);
}

//Utility to check if user is logged in with a .edu email
function checkStudent() {
	//get the authenticated user...
	const user = fire.auth().currentUser;

	if (user != null) {
		const email = user.email;
		//regular expression for finding some email that ends in .edu
		var exp = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+.edu$");
		//test the validity of the email, return true if ends in .edu
		var result = exp.test(email);
		if (result) {
			//this is where we'd do something with the logic.
			return true;
		}
		return false;
	}
}

//The main function
function StudentDeals() {
	//This is for material-ui
	const classes = useStyles();

	// Firestore
	const [items, setItems] = React.useState([]);

	//Get all cars with student discounts
	//For a car to be listed here it needs sDiscounted: true boolean attribute
	//And a sPrice number value attribute.
	React.useEffect(() => {
		const fetchItems = async () => {
			const db = fire.firestore();
			const data = await db
				.collection("cars")
				.where("sDiscounted", "==", true)
				.get();
			setItems(data.docs.map((doc) => doc.data()));
		};
		fetchItems();
	}, []);

	if (!checkStudent()) {
		return null;
	} else {
		//hardcoded lists of Makes
		return (
			<>
				<div className="dealBanner">
					Redline deals just for college students like you!
				</div>
				{checkNoCars(items)}

				{/* We need to figure out how to order the cards better. Perhaps some math? */}

				<CardColumns>
					{items.map((item) => (
						<Card className="text-center">
							<>
								<div className="card-text-center">
									<>
										{/*****CAR PICTURE FROM DB****/}
										{/****NOTE: HAD TO REMOVE HTTPS:// FROM SRC NAME BC JSON ESCAPES ON SLASHES!.....*****/}
										<CarInfo car={item}>
											<Card.Img
												style={{ width: "18rem" }}
												variant="top"
												src={"https://" + item.image}
											/>
										</CarInfo>
										{/****CAR INFO BELOW*****/}
										<Card.Title>
											<strong>
												{item.year + " " + item.make + " " + item.model}{" "}
											</strong>
										</Card.Title>
										<Card.Text> {"Fuel: " + item.fuelType} </Card.Text>
										<Card.Text> {"Mileage: " + item.mileage} </Card.Text>
										{/* Inline CSS, can be removed if you want. */}
										<Card.Text>
											{" "}
											<span style={{ "text-decoration": "line-through" }}>
												{"$" + item.price}
											</span>
											<span style={{ color: "red" }}> {"$" + item.sPrice}</span>{" "}
										</Card.Text>
									</>
								</div>
							</>
						</Card>
					))}
				</CardColumns>

				<div className="dealBanner">
					We love our undergrads behind the wheels of premium grade autos,
					REDLINE AUTOS!
				</div>
			</>
		);
	}
}

export default StudentDeals;
