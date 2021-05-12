import React from "react";
import "./MainPage.css";
import NavBarLogin from "./NavBarLogin";
import NavBarPages from "./NavBarPages";
import fire from "./Fire";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


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

function AdminPage(doc) {
	const classes = useStyles();
	const [items, setItems] = React.useState([]);
	const [employee, setEmployee] = React.useState({});
	const [employeeInfo, setEmployeeInfo] = React.useState({});

	//This gets the vehicle chosen in the drop down from inventory
	const handleChange = (e) => {
		e.preventDefault();
		if (e.target.value == "Invalid") {
			//skip
		} else {
			setEmployee(JSON.parse(e.target.value));
			setEmployeeInfo(JSON.parse(e.target.value));
			//console.log(employee);
		}
	};

	const handleSetPriv = (e) => {
		e.preventDefault();
		let temp = { ...employeeInfo };
		temp.priv = e.target.value;
		setEmployeeInfo(temp);
		//console.log(vehicleInfo);
	};

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

	const updateEmployee = (e) => {
		e.preventDefault();
		var db = fire.firestore();
		try {
			db.collection("userInfo")
				.where("email", "==", employee.email)
				.get()
				.then((doc) => {
					doc.forEach((emp) => {
						var up = db.collection("userInfo").doc(emp.id.toString());
						return up
							.update({
								priv: employeeInfo.priv,
							})
							.then(() => {
								window.location.reload();

								console.log("Updated employee successfully.");
							})
							.catch((error) => {
								console.error("Error updating document: ", error);
							});
					});
				});
		} catch (error) {
			alert("Improper Choice.\n\nDetails:\n\n" + error);
		}
	};

	return (
		<>
			{/*Top Login/Register navigation bar*/}
			<NavBarLogin />

			<NavBarPages />

			<div className="admin-page">
				<h2>Employee Management</h2>
				{/* <Link to= "/AddEmployee" className="btn btn-sm btn-success mb-2">
				<a href="/AddEmployee" className="addemployee">	Add User</a>
			</Link> */}
				{/* <table className="table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '30%' }}>Role</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>


				{items.map((item) => (
					<>
					<tr>
					<td>{item.email}</td>
					<td>{privLabel(item.priv)}</td>
					</tr>
					</>
				))}

                </tbody>
            </table> */}

				<FormControl className={classes.formControl}>
					<InputLabel shrink htmlFor="select-multiple-native">
						Choose Employee
					</InputLabel>
					<Select
						native
						onChange={handleChange}
						inputProps={{
							id: "select-multiple-native",
						}}
					>
						<option value="Invalid">Select an Employee</option>
						{items.map((item) => (
							<option key={item.id} value={JSON.stringify(item)}>
								{item.email}
							</option>
						))}
					</Select>
				</FormControl>
				<TextField
					id="emailDisplay"
					label="Employee Email"
					value={!!employee.email ? employee.email : "Select User"}
					InputProps={{
						readOnly: true,
					}}
				/>
				<TextField
					id="currentPriv"
					label="Current Status"
					value={!!employee.priv ? privLabel(employee.priv) : "Select User"}
					InputProps={{
						readOnly: true,
					}}
				/>
				<TextField
					select
					id="component-simple"
					label="New Status"
					defaultValue={1}
					onChange={handleSetPriv}
				>
					<MenuItem value={0}> Non-Employee </MenuItem>
					<MenuItem value={1}> Employee </MenuItem>
					<MenuItem value={2}> Manager </MenuItem>
				</TextField>
				<Button
					variant="outlined"
					color="primary"
					type="submit"
					className="btn btn-primary"
					onClick={updateEmployee}
				>
					Update Employee
				</Button>
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

export default AdminPage;
