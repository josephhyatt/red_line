import React from "react";
import "./MainPage.css";
import NavBarPages from "./NavBarPages";
import NavBarLogin from "./NavBarLogin";
import fire from "./Fire";
import Button from "@material-ui/core/Button";

function AddEmployee() {
	const onCreate = (e) => {
		const employeeform = document.querySelector("#add-employee-form");
		e.preventDefault();
		var db = fire.firestore();
		db.collection("userInfo")
			.where("email", "==", employeeform.email.value)
			.get()
			.then((doc) => {
				if (doc) {
					doc.forEach((user) => {
						var up = db.collection("userInfo").doc(user.id.toString());
						//console.log(employeeform.firstName.value);
						//console.log(parseInt(employeeform.priv.value));
						return up
							.update({
								priv: parseInt(employeeform.priv.value),
							})
							.then(() => {
								//window.location.reload();
								//clears the input fields when after user submits
								employeeform.email.value = "";
								// employeeform.firstName.value = '';
								// employeeform.lastName.value = '';
								// employeeform.phoneNumber.value = '';
								employeeform.priv.value = "";
								console.log("Added Employee successfully.");
								//go to admin page
								window.location.href = "Employees";
							})
							.catch((error) => {
								console.error("Error updating document: ", error);
							});
					});
				}
			});
	};

	return (
		<>
			{/*Top Login/Register navigation bar*/}
			<NavBarLogin />
			<NavBarPages />
			<div className="add-employee">
				<h1 className="h1-addEmployee">Add Employee:</h1>

				<form id="add-employee-form">
					<input
						type="text"
						id="email"
						name="email"
						placeholder="Employee Email"
					></input>
					{/* <input type="text" id="firstName" name="firstName" placeholder="First Name"></input>
                <input type="text" id="lastName" name="lastName" placeholder="Last Name"></input>
                <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Employee PhoneNumber"></input> */}
					<div>Role:</div>
					<select type="number" id="priv" name="priv" placeholder="priv">
						<option value="1">Employee</option>
						<option value="2">Manager</option>
					</select>
					<br />
					<br />
					<Button
						onClick={onCreate}
						type="addemployeebtn"
						variant="outlined"
						color="primary"
					>
						{" "}
						Add Employee
					</Button>
				</form>
			</div>
			{/*Footer*/}
			<footer className="footer">
				<div>
					<p>© 2021 Team Red Line. All rights reserved.</p>
				</div>
			</footer>
		</>
	);
}
export default AddEmployee;
