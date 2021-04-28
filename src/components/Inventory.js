import React from "react";
import "./MainPage.css";
import Card from "react-bootstrap/Card";
import { Grid } from "@material-ui/core";
import fire from "./Fire";
import CardColumns from "react-bootstrap/CardColumns";
import CarInfo from "./CarInfo";
import NavBarLogin from "./NavBarLogin";
import NavBarPages from "./NavBarPages";

function Inventory() {
	const [items, setItems] = React.useState([]);

	React.useEffect(() => {
		const user = fire.auth().currentUser;

		const fetchItems = async () => {
			const db = fire.firestore();
			const data = await db.collection("cars").get();
			setItems(data.docs.map((doc) => doc.data()));
		};
		fetchItems();
		// Probably won't need this.
		// const checkLogin = async () => {
		// 	if (user) {
		// 		console.log("User email: ", user.email);
		// 		var db = fire.firestore();
		// 		var userID = String(user.uid);
		// 		db.collection("userInfo")
		// 			.where("id", "==", userID)
		// 			.get()
		// 			.then((doc) => {
		// 				doc.forEach((user) => {
		// 					if (user.data().priv > 0) {
		// 						window.alert(
		// 							"Welcome: " + user.data().email + ", You are an Employee!"
		// 						);
		// 					}
		// 				});
		// 			});
		// 	}
		// };
		// checkLogin();
	}, []);

	return (
		<>
			{/*Top Login/Register navigation bar*/}
			<NavBarLogin />

			<NavBarPages />

			<div className="banner"></div>
			<Grid container>
				<div>
					{/****INVENTORY SHOWN HERE.....*****/}
					<div className="noscroll">
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
												<Card.Text> {"Mileage: " + item.mileage} </Card.Text>
												<Card.Text> {"$" + item.price} </Card.Text>
											</>
										</div>
									</>
								</Card>
							))}
						</CardColumns>
					</div>
					{/*****END OF CAR CARDS****/}
				</div>
			</Grid>

			{/*Footer*/}
			<footer className="footer">
				<div>
					<p>© 2021 Team Red Line. All rights reserved.</p>
				</div>
			</footer>
		</>
	);
}

export default Inventory;
