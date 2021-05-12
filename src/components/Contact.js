import React, { Component } from "react";
import "./Contact.css";
import NavBarLogin from "./NavBarLogin";
import NavBarPages from "./NavBarPages";

class Contact extends Component {
	render() {
		return (
			<>
				{/*Top Login/Register navigation bar*/}
				<NavBarLogin />

				{/*Navigation Bar*/}
				<NavBarPages />

				{/*Car banner with blur*/}
				{/* <div className="bannerblur">
					<img src={banner}></img>
				</div> */}

				{/*Information box*/}
				<div className="Informationform">
					<h1 className="TEAMfont">
						TEAM <span style={{ color: "red" }}>RED</span>LINE
					</h1>

					<div className="MEMBERfont">
						<span style={{ color: "red" }}>
							---------------------------------------------
						</span>
						<p>Robert Everhart - Project Manager / SE</p>
						<p>Jairus Latayan - Assistant Project Manager</p>
						<p>Carlos Maldonado - Software Engineer</p>
						<p>Joseph Hyatt - Software Engineer / QA</p>
						<p>Adam Zuiderveid - Software Engineer</p>
						<p>Zhiming Zhao - Software Engineer</p>
						<p>Brian Canales - Software Engineer</p>
						<span style={{ color: "red" }}>
							---------------------------------------------
						</span>
						<p>Email: redline@csusb.edu</p>
						<p>Phone: (909)537-5000</p>
						<p>5500 University Parkway San Bernardino, CA 92407</p>
					</div>
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
}

export default Contact;
