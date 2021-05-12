import React from "react";
import "./MainPage.css";
import Card from "react-bootstrap/Card";
import { Grid } from "@material-ui/core";
import fire from "./Fire";
import CarInfo from "./CarInfo";
import NavBarLogin from "./NavBarLogin";
import NavBarPages from "./NavBarPages";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
	input: {
		margin: theme.spacing(1),
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
}));

function UpdateCar() {
	const classes = useStyles();
	const [items, setItems] = React.useState([]);
	const [vehicle, setVehicle] = React.useState({});
	const [vehicleInfo, setVehicleInfo] = React.useState({ sDiscounted: false });
	const [image, setImage] = React.useState(null);
	const [open, setOpen] = React.useState(false);

	//This gets the vehicle chosen in the drop down from inventory
	const handleChange = (e) => {
		e.preventDefault();
		if (e.target.value == "Invalid") {
			setVehicleInfo({});
			setVehicle({});
		} else {
			setVehicle(JSON.parse(e.target.value));
			setVehicleInfo(JSON.parse(e.target.value));
			//console.log(vehicle);
		}
	};

	//All of these functions are used to populate our new information
	const handleSetMake = (e) => {
		e.preventDefault();
		let temp = { ...vehicleInfo };
		temp.make = e.target.value;
		setVehicleInfo(temp);
		//console.log(vehicleInfo);
	};
	const handleSetModel = (e) => {
		e.preventDefault();
		let temp = { ...vehicleInfo };
		temp.model = e.target.value;
		setVehicleInfo(temp);
		//console.log(vehicleInfo);
	};
	const handleSetYear = (e) => {
		e.preventDefault();
		let temp = { ...vehicleInfo };
		temp.year = e.target.value;
		setVehicleInfo(temp);
		//console.log(vehicleInfo);
	};
	const handleSetMileage = (e) => {
		e.preventDefault();
		let temp = { ...vehicleInfo };
		temp.mileage = e.target.value;
		setVehicleInfo(temp);
		//console.log(vehicleInfo);
	};
	const handleSetPrice = (e) => {
		e.preventDefault();
		let temp = { ...vehicleInfo };
		temp.price = e.target.value;
		setVehicleInfo(temp);
		//console.log(vehicleInfo);
	};
	const handleSetFuelType = (e) => {
		e.preventDefault();
		let temp = { ...vehicleInfo };
		temp.fuelType = e.target.value;
		setVehicleInfo(temp);
		//console.log(vehicleInfo);
	};
	const handleSetDiscounted = (e) => {
		e.preventDefault();
		let temp = { ...vehicleInfo };
		temp.sDiscounted = e.target.value;
		setVehicleInfo(temp);
		//console.log(vehicleInfo);
	};
	const handleSetSPrice = (e) => {
		e.preventDefault();
		let temp = { ...vehicleInfo };
		temp.sPrice = e.target.value;
		setVehicleInfo(temp);
		//console.log(vehicleInfo);
	};
	const handleSetMoreDetails = (e) => {
		e.preventDefault();
		let temp = { ...vehicleInfo };
		temp.moreDetails = e.target.value;
		setVehicleInfo(temp);
		//console.log(vehicleInfo);
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
		const storageRef = fire.storage().ref();
		const fileRef = storageRef.child(image.name);
		fileRef.put(image).then(() => {
			fileRef.getDownloadURL().then((url) => {
				//console.log("URL:",url);
				let temp = { ...vehicleInfo };
				//We slice 8 here to remove https:// from the url, this might not be needed if we change how things work. Alas...
				temp.image = url.slice(8);
				setVehicleInfo(temp);
				//console.log(vehicleInfo);
			});
		});
	};

	//This is for the security dialog for the delete vehicle function
	const handleClickDelete = () => {
		setOpen(true);
	};

	//This is for the security dialog for the delete vehicle function
	const handleCloseDelete = () => {
		setOpen(false);
	};

	//Actually update the vehicle, and show the update live in the displayed Car Info card.
	//IMPORTANT, we need the car to have an ID field value that makes sense.
	const updateVehicle = (e) => {
		e.preventDefault();
		var db = fire.firestore();
		try {
			db.collection("cars")
				.where("id", "==", vehicle.id)
				.get()
				.then((doc) => {
					doc.forEach((car) => {
						var up = db.collection("cars").doc(car.id.toString());
						return up
							.update({
								make: vehicleInfo.make,
								model: vehicleInfo.model,
								year: vehicleInfo.year,
								mileage: vehicleInfo.mileage,
								price: vehicleInfo.price,
								fuelType: vehicleInfo.fuelType,
								sDiscounted: !!vehicleInfo.sDiscounted
									? vehicleInfo.sDiscounted
									: false,
								sPrice: vehicleInfo.sPrice,
								moreDetails: vehicleInfo.moreDetails,
								image: vehicleInfo.image,
							})
							.then(() => {
								// window.location.reload();
								setVehicle(vehicleInfo);
								console.log("Updated the car successfully.");
							})
							.catch((error) => {
								console.error("Error updating document: ", error);
							});
					});
				});
		} catch (error) {
			alert(
				"Not all forms are properly filled, vehicle not updated\n\nDetails:\n\n" +
					error
			);
		}
	};

	//Delete the vehicle, then refresh the page.
	//Perhaps instead of refreshing, we can make the Car Info card display blank?
	//IMPORTANT, we need the car to have an ID field value that makes sense.
	const deleteVehicle = (e) => {
		e.preventDefault();
		try {
			var db = fire.firestore();

			db.collection("cars")
				.where("id", "==", vehicle.id)
				.get()
				.then((doc) => {
					doc.forEach((car) => {
						var del = db.collection("cars").doc(car.id.toString());
						return del
							.delete()
							.then(() => {
								window.location.reload();
								console.log("Deleted the car successfully.");
							})
							.catch((error) => {
								console.error("Error deleting document: ", error);
							});
					});
				});
		} catch (error) {
			alert("No vehicle found to delete.\n\nDetails:\n\n" + error);
		}
	};

	//Get all of our inventory at load
	React.useEffect(() => {
		const user = fire.auth().currentUser;

		const fetchItems = async () => {
			const db = fire.firestore();
			const data = await db.collection("cars").orderBy("id").get();
			setItems(data.docs.map((doc) => doc.data()));
		};
		fetchItems();
	}, []);

	return (
		<>
			{/*Top Login/Register navigation bar*/}
			<NavBarLogin />

			<NavBarPages />

			<div className="banner"></div>
			<div className={classes.root} id="update-form">
				<div>
					<p>Instructions for use:</p>
					<ul>
						<li>Choose vehicle</li>
						<li>Fill out all necessary fields</li>
						<li>Update image by selecting "Choose File"</li>
						<li>Click "Upload"</li>
						<li>Click "Update Vehicle Info"</li>
						<li>Or "Delete Vehicle"</li>
					</ul>
				</div>

				<Grid item={1}>
					<FormControl className={classes.formControl}>
						<InputLabel shrink htmlFor="select-multiple-native">
							Choose Vehicle
						</InputLabel>
						<Select
							native
							onChange={handleChange}
							inputProps={{
								id: "select-multiple-native",
							}}
						>
							<option value="Invalid">Select a Car</option>
							{items.map((item) => (
								<option key={item.id} value={JSON.stringify(item)}>
									ID: {item.id}, {item.make}, {item.model}
								</option>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid container spacing={0}>
					<Grid item>
						<Grid container spacing={1}>
							<Grid item>
								<FormControl>
									Vehicle Make:
									<Input
										id="component-simple"
										placeholder={vehicle.make}
										onChange={handleSetMake}
									/>
								</FormControl>
							</Grid>
							<Grid item={1}>
								<FormControl>
									Vehicle Model:
									<Input
										id="component-simple"
										placeholder={vehicle.model}
										onChange={handleSetModel}
									/>
								</FormControl>
							</Grid>
							<Grid item={1}>
								<FormControl>
									Vehicle Year:
									<Input
										id="component-simple"
										placeholder={vehicle.year}
										onChange={handleSetYear}
									/>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item>
								<FormControl>
									Vehicle Mileage:
									<Input
										id="component-simple"
										placeholder={vehicle.mileage}
										onChange={handleSetMileage}
									/>
								</FormControl>
							</Grid>
							<Grid item={1} xs={6}>
								<FormControl>
									Vehicle Price:
									<Input
										id="component-simple"
										placeholder={vehicle.price}
										onChange={handleSetPrice}
									/>
								</FormControl>
							</Grid>
							<Grid item={1} xs={12} sm={12}>
								<FormControl>
									Vehicle Fuel Type:
									<Input
										id="component-simple"
										placeholder={vehicle.fuelType}
										onChange={handleSetFuelType}
									/>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item xs={6} sm={12}>
								<FormControl>
									Vehicle Discounted?:
									<Select
										id="component-simple"
										placeholder={vehicle.mileage}
										defaultValue="false"
										onChange={handleSetDiscounted}
									>
										<MenuItem value={false}> No Discount </MenuItem>
										<MenuItem value={true}> Discount </MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item={1}>
								<FormControl>
									Vehicle Discount Price:
									<Input
										id="component-simple"
										placeholder={vehicle.sprice}
										onChange={handleSetSPrice}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={6} sm={12}>
								<TextField
									id="standard-multiline-static"
									label="Vehicle Details"
									multiline
									rows={2}
									placeholder={vehicle.moreDetails}
									onChange={handleSetMoreDetails}
								/>
							</Grid>
							<Grid item>
								<input type="file" onChange={handleChangeFile} />

								<button onClick={handleUpload}>Upload</button>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item>
								<Button
									variant="outlined"
									color="primary"
									type="submit"
									className="btn btn-primary"
									onClick={updateVehicle}
								>
									Update Vehicle Info
								</Button>
							</Grid>
							<Grid item>
								<Button
									variant="outlined"
									color="primary"
									type="submit"
									className="btn btn-primary"
									onClick={handleClickDelete}
								>
									Delete Vehicle
								</Button>

								<Dialog
									open={open}
									onClose={handleCloseDelete}
									aria-labelledby="alert-dialog-title"
									aria-describedby="alert-dialog-description"
								>
									<DialogTitle id="alert-dialog-title">{"Delete?"}</DialogTitle>
									<DialogContent>
										<DialogContentText id="alert-dialog-description">
											Are you sure you want to delete this vehicle? This
											operation can't be undone!
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button onClick={handleCloseDelete} color="primary">
											No, go back
										</Button>
										<Button onClick={deleteVehicle} color="primary" autoFocus>
											Yes, Delete
										</Button>
									</DialogActions>
								</Dialog>
							</Grid>
						</Grid>
					</Grid>
					{/* <Grid item></Grid> */}
				</Grid>
			</div>

			<div className="noscroll">
				<Card className="text-center">
					<>
						<div className="card-text-center">
							<>
								{/*****CAR PICTURE FROM DB****/}
								{/****NOTE: HAD TO REMOVE HTTPS:// FROM SRC NAME BC JSON ESCAPES ON SLASHES!.....*****/}
								{!!vehicle.image ? (
									<>
										<CarInfo car={vehicle}>
											{/* <Card.Img
															style={{ width: "18rem" }}
															variant="top"
															src={"https://" + vehicle.image}
														/> */}
										</CarInfo>
										<Card.Title>
											<strong>
												{vehicle.year +
													" " +
													vehicle.make +
													" " +
													vehicle.model}{" "}
											</strong>
										</Card.Title>
										<Card.Text>
											{" "}
											{"Mileage: " +
												vehicle.mileage +
												" Fuel: " +
												vehicle.fuelType}{" "}
										</Card.Text>
										<Card.Text> {"$" + vehicle.price} </Card.Text>
										{!!vehicle.sDiscounted ? (
											<Card.Text> {"Discount $" + vehicle.sPrice} </Card.Text>
										) : null}
										<Card.Text> {"Details: " + vehicle.moreDetails} </Card.Text>
									</>
								) : (
									<div>Selected vehicle will display here.</div>
								)}
							</>
						</div>
					</>
				</Card>
			</div>
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

export default UpdateCar;
