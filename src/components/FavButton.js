import React from "react";
import "./MainPage.css";
import fire from "./Fire";

const FavButton = (car) => {
	//We add to the userInfo favorites map
	//For reasons I do not yet know, you must use car.car to access car
	const addFavorite = (e) => {
		e.preventDefault();
		//This is accessing the favorites map and setting an id based on the car
		const keyName =
			"favorites." + car.car.make + " " + car.car.model + " " + car.car.id;
		//Get the current user
		const user = fire.auth().currentUser;
		//If we have a user, should always be true but could not in a weird case
		if (user) {
			var db = fire.firestore();
			var userID = String(user.uid);
			db.collection("userInfo")
				.where("id", "==", userID)
				.get()
				.then((doc) => {
					doc.forEach((user) => {
						console.log("Doc ID: ", user.id);
						var up = db.collection("userInfo").doc(user.id);
						return (
							up
								//VERY IMPORTANT, use update as it will add any new fields while retaining the rest!
								//Add or set will completely erase the rest of the document fields.
								.update({
									[keyName]: {
										//We need one for every attribute a car has
										make: car.car.make,
										model: car.car.model,
										id: car.car.id,
										image: car.car.image,
										fuelType: car.car.fuelType,
										mileage: car.car.mileage,
										moreDetails: car.car.moreDetails,
										price: car.car.price,
										year: car.car.year,
									},
								})
								.then(() => {
									window.location.reload();
									console.log("Added favorite successfully.");
								})
								.catch((error) => {
									console.error("Error adding document: ", error);
								})
						);
					});
				});
		}
	};

	var favbutton = (
		<>
			<button type="submit" className="btn btn-primary" onClick={addFavorite}>
				Favorite
			</button>
		</>
	);

	const user = fire.auth().currentUser;
	if (!user) {
		favbutton = null;
	}
	return favbutton;
};

export default FavButton;
