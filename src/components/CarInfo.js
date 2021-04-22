import React from "react";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";

const CarInfo = ({ car, history }) => {
	const handleClick = () => {
		history.push(`/car/${car.make}/${car.model}/${car.id}`, {
			car,
		});
	};

	const imgpath = "https://" + car.image;
	return (
		//    <img style={{ width: "18rem" }} src ={imgpath} onClick ={handleClick}></img>
		<Card.Img
			style={{ width: "18rem", cursor: "pointer" }}
			variant="top"
			src={imgpath}
			onClick={handleClick}
		/>
	);
};

export default withRouter(CarInfo);
