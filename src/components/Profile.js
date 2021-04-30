import React, { Component, useEffect } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import logo from "./images/logo.png";
import banner from "./images/cars.jpg";
import "./Profile.css";
import NavBarLogin from "./NavBarLogin";
import NavBarPages from "./NavBarPages";
import fire from "./Fire";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.updateProfile = this.updateProfile.bind(this);
    this.state = {
      user: fire.auth().currentUser,
      id: "",
      data: null,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      pending: true,
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getProfile() {
    if (this.state.user) {
      var db = fire.firestore();
      var userID = String(this.state.user.uid);
      db.collection("userInfo")
        .where("id", "==", userID)
        .get()
        .then((doc) => {
          doc.forEach((user) => {
            this.setState({ id: user.id, data: user.data(), pending: false });
          });
        });
		this.setState({pending:false});
    }
  }

  //Run after render, for updates
  componentDidMount() {
    this.getProfile();
  }

  //update the user's profile
  // !! Wont work if the user does not have a user in the userInfo firestore collection!
  updateProfile() {
    if (this.state.user) {
      var db = fire.firestore();
      var userID = String(this.state.user.uid);
      db.collection("userInfo")
        .where("id", "==", userID)
        .get()
        .then((doc) => {
          doc.forEach((user) => {
            this.setState({ id: user.id });
            console.log("Doc ID: ", user.id);
            var up = db.collection("userInfo").doc(this.state.id.toString());
            return up
              .update({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
              })
              .then(() => {
				window.location.reload();
                console.log("Updated the user profile successfully.");
              })
              .catch((error) => {
                console.error("Error updating document: ", error);
              });
          });
        });
    }
  }

  render() {
	  //getting the user information takes a second, so load.
    if (this.state.pending) {
      return <>Getting user information...</>;
    } else {
      return (
        <>
          {/*Top Login/Register navigation bar*/}
          <NavBarLogin />

          <NavBarPages />

          {/*Car banner with blur*/}
          <div className="bannerblur">
            <img src={banner}></img>
          </div>

          {/*Profile box*/}
          <div className="profileform">
            <h1 className="profilefont">Profile Information:</h1>
            <p>Update your information.</p>
            <label for="email">
              <b>First Name:</b>
            </label>
            <input
              value={this.state.firstName}
              onChange={this.handleChange.bind(this)}
              type="profiletext"
              name="firstName"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder={!!this.state.data ? this.state.data.firstName : "First Name"}
            />

            <label for="psw">
              <b>Last Name:</b>
            </label>
            <input
              value={this.state.lastName}
              onChange={this.handleChange.bind(this)}
              type="profiletext"
              name="lastName"
              class="form-control"
              id="exampleInputPassword1"
              placeholder={!!this.state.data ? this.state.data.lastName : "Last Name"}
            />

            <label for="psw">
              <b>Phone Number:</b>
            </label>
            <input
              value={this.state.phoneNumber}
              onChange={this.handleChange.bind(this)}
              type="profiletext"
              name="phoneNumber"
              class="form-control"
              id="exampleInputPassword1"
              placeholder={!!this.state.data ? this.state.data.phoneNumber : "Phone Number"}
            />

            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.updateProfile}
            >
              Submit
            </button>
            <br></br>
            <br></br>
            <label for="error" id="error"></label>

            {/*<div className="container signin">
							<p className="bformtext">
								Already have an account?{" "}
								<Link to="/Login">
									<a href="/Login" className="signincolor">
										Sign in
									</a>{" "}
								</Link>{" "}
							</p>
						</div>*/}
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
}

export default Profile;
