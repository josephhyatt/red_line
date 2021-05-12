import React from "react";
import "./MainPage.css";
import fire from "./Fire";
import NavBarLogin from "./NavBarLogin";
import NavBarPages from "./NavBarPages";
import SearchPage from "./SearchPage";

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
			<div className="Inventory-p">
				<h2>Inventory</h2>
			</div>
			<div className="banner"></div>
			<div className="search-margin-bottom">
				<SearchPage />
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

export default Inventory;
