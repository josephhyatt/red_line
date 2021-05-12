import React from "react";
import "./MainPage.css";
import NavBarLogin from "./NavBarLogin";
import NavBarPages from "./NavBarPages";
import Button from "@material-ui/core/Button";
import fire from "./Fire";

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function AddPage() {
	const [makeVal, setMakeVal] = React.useState("Audi");
	const [image, setImage] = React.useState(null);
	const [url, setUrl] = React.useState("");
	const handleSelectMake = (e) => {
		setMakeVal(e.target.value);
		e.preventDefault();
	};

	//Upload a file from your computer
	const handleChangeFile = (e) => {
		e.preventDefault();
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};
	//Send that file to firebase storage and get a link, add to our updated information
	const handleUpload = (e) => {
		e.preventDefault();
		const storageRef = fire.storage().ref();
		const fileRef = storageRef.child(image.name);
		fileRef.put(image).then(() => {
			fileRef.getDownloadURL().then((url) => {
				//console.log("URL:",url);
				//We slice 8 here to remove https:// from the url, this might not be needed if we change how things work. Alas...
				setUrl(url.slice(8));
				//console.log(vehicleInfo);
			});
		});
	};

	//hardcoded elements, perhaps firestore?
	const models = {
		Audi: ["A2"],
		BMW: ["116", "320", "X1"],
		Ford: ["Fiesta"],
		Mazda: ["6"],
		"Mercedes-Benz": ["200", "e250"],
		Peugeot: ["3008"],
		Renault: ["Cilo", "Espace", "Megane IV"],
		Seat: ["Leon"],
		Smart: ["For two"],
		Volkswagen: ["EOS", "Golf", "Tiguan"],
	};
	//Pass in the selected make value (makeval) and the list of possible models
	//Right now, models is stored as JSON, but it'd be better if we got this from Firestore.
	function populateModels(make, models) {
		if (make in models) {
			return models[make].map((item) => <option value={item}>{item}</option>);
		}
	}

	function populateYears() {
		var i;
		var years = [];
		for (i = 2021; i >= 1960; i--) {
			years.push(i);
		}
		return years.map((year) => <option value={year}>{year}</option>);
	}

	//adding to db
	const onCreate = (e) => {
		const carform = document.querySelector("#add-car-form");
		e.preventDefault();
		fire
			.firestore()
			.collection("cars")
			.add({
				//parseInt lets firebase know to store as a number
				fuelType: carform.fuelType.value,
				id: carform.id.value,
				image: carform.image.value,
				make: carform.make.value,
				mileage: parseInt(carform.mileage.value),
				model: carform.model.value,
				moreDetails: carform.moreDetails.value,
				price: parseInt(carform.price.value),
				year: parseInt(carform.year.value),
			})
			.then(() => {
				//go to updatecar page
				window.location.href = "UpdateCar";
			});
		//clears the input fields when after user submits
		carform.fuelType.value = "";
		carform.id.value = "";
		carform.image.value = "";
		carform.make.value = "";
		carform.mileage.value = "";
		carform.model.value = "";
		carform.moreDetails.value = "";
		carform.price.value = "";
		carform.year.value = "";
	};
	return (
		<>
			{/*Top Login/Register navigation bar*/}
			<NavBarLogin />

			<NavBarPages />
			<h1 className="add-vehicle">Add Vehicle:</h1>

			<form id="add-car-form">
				{/* <input type="text" id="fuelType" name="fuelType" placeholder="Fuel Type"></input> */}
				<label for="fuelType">Fuel Type: </label>
				<select id="fuelType" name="fuelType">
					<option value="Gasoline">Gasoline</option>
					<option value="Diesel">Diesel</option>
				</select>
				<br />
				<label for="id">ID: </label>
				<input
					type="text"
					id="id"
					name="id"
					defaultValue={getRandomInt(10000)}
				></input>
				{/* <input type="text" id="make" name="make" placeholder="Make"></input> */}

				<label for="make">Car Make: </label>
				<select id="make" name="make" onChange={handleSelectMake}>
					<option value={"Audi"}>Audi</option>
					<option value={"BMW"}>BMW</option>
					<option value={"Ford"}>Ford</option>
					<option value={"Mazda"}>Mazda</option>
					<option value={"Mercedes-Benz"}>Mercedes-Benz</option>
					<option value={"Peugeot"}>Peugeot</option>
					<option value={"Renault"}>Renault</option>
					<option value={"Seat"}>Seat</option>
					<option value={"Smart"}>Smart</option>
					<option value={"Volkswagen"}>Volkswagen</option>
				</select>
				<label for="model">Car Model: </label>
				<select id="model" name="model">
					{populateModels(makeVal, models)}
				</select>
				<input
					type="text"
					id="mileage"
					name="mileage"
					placeholder="Mileage"
				></input>
				{/* <input type="text" id="model" name="model" placeholder="Model"></input> */}
				<input
					type="text"
					id="moreDetails"
					name="moreDetails"
					placeholder="More Details"
				></input>
				<input type="text" id="price" name="price" placeholder="Price"></input>
				{/* <input type="text" id="year" name="year" placeholder="Year"></input> */}
				<label for="year">Car Year: </label>
				<select id="year" name="year">
					{populateYears()}
				</select>
				{/* <label for="image">Select Vehicle Image:</label> */}
				{/* Change type to "file" to switch to file upload input and uncomment line above to give it a label */}
				<input
					type="text"
					id="image"
					name="image"
					placeholder="Image"
					value={!!url ? url : null}
				></input>
				<input type="file" onChange={handleChangeFile} />
				<button onClick={handleUpload}>Upload</button>
				<br />
				<Button onClick={onCreate} variant="outlined" color="primary">
					{" "}
					Add Car
				</Button>
			</form>
			<br />
			<br />
			<br />
			<br />
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
}

export default AddPage;
