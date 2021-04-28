import React, { Component } from "react";
import "./MainPage.css";
import { BrowserRouter as Link } from "react-router-dom";
import logo from "./images/logo.png";
import NavBarTools from "./NavBarTools";

class NavBarPages extends Component {

    render() {
		return (
                <nav className="navBar">
                    <div className="navbar-container">
                        <img className="logo" src={logo}></img>
                        <Link to="/">
                            <a href="/" className="active">
                                Home
                            </a>
                        </Link>{" "}
                        {/*selected page*/}
                        {/* We eventually need to remove this data section. This is for testing. */}
                        {/* <Link to="/Data"><a href ="/Data" className="data">Data</a></Link> */}
                        <Link to="/Inventory">
                            <a href="/Inventory" className="inventory">
                                Inventory
                            </a>
                        </Link>
                        <Link to="#">
                            <a href="#" className="inventory">
                                Contact
                            </a>
                        </Link>
                        <NavBarTools/>
                    </div>
                </nav>
        )};
}

export default NavBarPages;