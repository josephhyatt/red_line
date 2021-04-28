import React, { Component } from "react";
import "./MainPage.css";
import { BrowserRouter as Link } from "react-router-dom";
import fire from "./Fire";

class NavBarTools extends Component {
    constructor(props) {
        super(props);
        this.getPriv = this.getPriv.bind(this);
        this.state = {priv: 0};
    }

    //function to get our priv from firestore and set state
    getPriv() {
        const user = fire.auth().currentUser;
        if (user) {
            console.log("User email: ", user.email);
            var db = fire.firestore();
            var userID = String(user.uid);
            db.collection("userInfo")
                .where("id", "==", userID)
                .get()
                .then((doc) => {
                    doc.forEach((user) => {
                        if (user.data().priv > 0) {
                            this.setState({priv: user.data().priv})
                        }
                    });
                });
        }
    }

    render() {
        //Conditionally render based on priv level
        const priv = this.state.priv;
        this.getPriv();
        let options;
        let mOptions;
        // Items for employee
        if (priv > 0) {
            options = <>
                        <Link to="/Data">
                            <a href="/Data" className="data">
                                Employee Data
                            </a>
                        </Link>
                        <Link to="#">
                            <a href="#" className="inventory">
                                Add Vehicle
                            </a>
                        </Link>
                        <Link to="#">
                            <a href="#" className="inventory">
                                Manage Vehicles
                            </a>
                        </Link>
                    </>
        }
        else {
            //If we have 0 priv, don't render anything.
            options = null;
        }
        // Additional items for manager
        if (priv > 1) {
            mOptions = <>
                        <Link to="/DataM">
                            <a href="/DataM" className="dataM">
                                Manage Employees
                            </a>
                        </Link>
                    </>
        }
        else {
            //If we have 0 priv, don't render anything.
            mOptions = null;
        }

		return (
            <>
                {options} {mOptions}
            </>
                    
        )};
}

export default NavBarTools;