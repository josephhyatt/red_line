import "./MainPage.css";
import fire from "./Fire";
import CarInfo from "./CarInfo";
import React from "react";
import NavBarPages from "./NavBarPages";
function Data() {
	const [items, setItems] = React.useState([]);

	React.useEffect(() => {
		const fetchItems = async () => {
			const db = fire.firestore();
			const data = await db.collection("cars").get();
			setItems(data.docs.map((doc) => doc.data()));
		};
		fetchItems();
	}, []);

	return (
		<div>
			<NavBarPages/>
			<h1>WELCOME TO THE SECRET PAGE ONLY EMPLOYEES CAN SEE!</h1>
			{items.map((item) => (
				<>
					<h1>
						{" "}
						{item.make + " " + item.model + " " + item.mileage + item.year}{" "}
					</h1>
					<CarInfo car={item} />
				</>
			))}
		</div>
	);
}

export default Data;
