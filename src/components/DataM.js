import "./MainPage.css";
import fire from "./Fire";
import React from "react";
import NavBarPages from "./NavBarPages";

function Data() {
	const [items, setItems] = React.useState([]);

	React.useEffect(() => {
		const fetchItems = async () => {
			const db = fire.firestore();
			const data = await db.collection("userInfo").where("priv", ">=", 1).get();
			setItems(data.docs.map((doc) => doc.data()));
		};
		fetchItems();
	}, []);

	const privLabel = (priv) => {
		if (priv == 1) {
			return "Employee";
		}
		if (priv == 2) {
			return "Manager";
		} else {
			return "";
		}
	};

	return (
		<div>
			<NavBarPages />
			<h1>WELCOME TO THE SECRET PAGE ONLY MANAGERS CAN SEE!</h1>
			<h3>List of all employees: </h3>
			<ul>
				{items.map((item) => (
					<>
						<li> {item.email + " " + privLabel(item.priv)} </li>
					</>
				))}
			</ul>
		</div>
	);
}

export default Data;
