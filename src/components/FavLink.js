import React from "react";
import { withRouter } from "react-router-dom";
import "./Profile.css";

const FavLink = ({ car, history }) => {
	const handleClick = () => {
		history.push(`/car/${car.make}/${car.model}/${car.id}`, {
			car,
		});
	};

	if (!car.id) {
		return null;
	} else {
		return (
			//    <img style={{ width: "18rem" }} src ={imgpath} onClick ={handleClick}></img>
			<div class="fav-button-div">
				<button
					type="submit"
					className="btn btn-danger"
					id="fav-button"
					onClick={handleClick}
				>
					{car.make}, {car.model}
				</button>
			</div>
		);
	}
};

export default withRouter(FavLink);
