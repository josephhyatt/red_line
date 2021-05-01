import React from "react";
import { withRouter } from "react-router-dom";
import fire from "./Fire";

const FavLink = ({ car, history }) => {
	const handleClick = () => {
       
        history.push(`/car/${car.make}/${car.model}/${car.id}`, {
            car
        });   
		
	};

    if(!car.id){
        return null;
    }
    else{
        return (
            //    <img style={{ width: "18rem" }} src ={imgpath} onClick ={handleClick}></img>
            <button onClick={handleClick}>
                {car.make}, {car.model}
            </button>
        );
    }
	
};

export default withRouter(FavLink);