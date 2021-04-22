import React, { useState } from "react";
import "./MainPage.css";
import Card from "react-bootstrap/Card";
import { Grid } from "@material-ui/core";
import fire from "./Fire";
import CardColumns from "react-bootstrap/CardColumns";
import CarInfo from "./CarInfo";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


//This is for material-ui
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

//Pass in the selected make value (makeval) and the list of possible models
//Right now, models is stored as JSON, but it'd be better if we got this from Firestore.
function populateModels(make, models){
    if (make in models) {
        return(models[make].map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
        )))
    }
}

//Utility to check if the car array is empty, and display an error.
function checkNoCars(items){
    if(items.length <= 0)
        return (
            //This is where we return the error and style it here.
            <div>No vehicles found in search.</div>
        )
}

//The main function
function Search() {

    //This is for material-ui
    const classes = useStyles();

    //This is for handling the select forms
    //Ugly states, can this be combined?
    const [makeVal, setMakeVal]=useState("");
    const [modelVal, setModelVal]=useState("");
    const [fuelVal, setFuelVal]=useState("");
    const [minPrice, setMinPrice]=useState("");
    const [maxPrice, setMaxPrice]=useState("");
    const [sortBy, setSortBy]=useState("");
    const handleSelectMake = (e) =>{
        setMakeVal(e.target.value)
        e.preventDefault();
    }
    const handleSelectModel = (e) =>{
        setModelVal(e.target.value)
        e.preventDefault();
    }
    const handleSelectFuel = (e) =>{
        setFuelVal(e.target.value)
        e.preventDefault();
    }
    const handleSelectMinPrice = (e) =>{
        setMinPrice(e.target.value)
        e.preventDefault();
    }
    const handleSelectMaxPrice = (e) =>{
        setMaxPrice(e.target.value)
        e.preventDefault();
    }
    const handleSelectSortBy = (e) =>{
        setSortBy(e.target.value)
        e.preventDefault();
    }


    // Firestore 
    const [items, setItems] = React.useState([]);

    //Get all inventory
	React.useEffect(() => {
		const fetchItems = async () => {
			const db = fire.firestore();
			const data = await db.collection("cars").get();
			setItems(data.docs.map((doc) => doc.data()));
		};
		fetchItems();
        
	}, []);

    //Filter search function
    //This performs many compound firestore queries
    //One caveat is complex queries that use multiple fields requires indexing
    //Firestore will spit an error out in the console with a clickable link to build a new index
    //We need an index for all possible combinations, this can get out of hand.
    //Sadly, index creation must be done manually through the Firestore Console
    //It takes some time to finish building each index.
    //We can't have more than 200 composite indexes. This is a limitation.
    //The simpler the search, the better.
    //https://console.firebase.google.com/u/0/project/team-red-line/firestore/indexes
    const searchForCars = () => {
        const fetchItems =   () => {
			const db = fire.firestore();
            let totalFilter = db.collection("cars")

            if(makeVal !="")
                totalFilter = totalFilter.where("make", "==", makeVal);
            if(modelVal !="")
                totalFilter = totalFilter.where("model", "==", modelVal);
            if(fuelVal !="")
                totalFilter = totalFilter.where("fuelType", "==", fuelVal);
            if(minPrice !="")
                totalFilter = totalFilter.where("price", ">=", minPrice);
            if(maxPrice !="")
                totalFilter = totalFilter.where("price", "<=", maxPrice);
            //After creating the composite filter, assign the resulting objects to items
            //We call sortByFilter here to sort before adding them to the items array.
            totalFilter
            .get()
                .then(function(querySnapshot) {
                setItems(querySnapshot.docs.map((doc) => doc.data()).sort(sortByFilter));
            })
		};
		fetchItems();
        
    }

    //Utility for sorting based on what rules are chosen
    //Firestore doesn't handle complex orderBy's well, so we do it with sort.
    const sortByFilter =  (a,b) => {
        if(sortBy != ""){
                if (sortBy == "newest")
                    return (parseInt(a.year) < parseInt(b.year));
                else if (sortBy == "oldest")
                    return (parseInt(a.year) > parseInt(b.year));
                else if (sortBy == "milelow")
                    return (parseInt(a.mileage) > parseInt(b.mileage));
                else if (sortBy == "milehigh")
                    return (parseInt(a.mileage) < parseInt(b.mileage));
                else if (sortBy == "expensive")
                    return (parseInt(a.price) < parseInt(b.price));
                else if (sortBy == "cheap")
                    return (parseInt(a.price) > parseInt(b.price));
            }
    }

    
    //hardcoded elements, perhaps firestore?
    const models = { "Audi":["A2"],
                "BMW":["116", "320", "X1"], 
                "Ford":["Fiesta"],
                "Mazda":["6"],
                "Mercedes-Benz":["200", "e250"],
                "Peugeot":["3008"],
                "Renault":["Cilo", "Espace", "Megane IV", ],
                "Seat":["Leon"],
                "Smart":["For two"],
                "Volkswagen":["EOS", "Golf", "Tiguan"]}

    const prices = [1000, 2000, 3000, 4000, 5000, 10000, 20000, 25000, 50000];

    //hardcoded lists of Makes
    return (
        <>
            <div className="searchFilterBox">
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="Make">Make</InputLabel>
                        <Select
                        value={makeVal}
                        onChange={handleSelectMake}
                        label="Make"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Audi"}>Audi</MenuItem>
                            <MenuItem value={"BMW"}>BMW</MenuItem>
                            <MenuItem value={"Ford"}>Ford</MenuItem>
                            <MenuItem value={"Mazda"}>Mazda</MenuItem>
                            <MenuItem value={"Mercedes-Benz"}>Mercedes-Benz</MenuItem>
                            <MenuItem value={"Peugeot"}>Peugeot</MenuItem>
                            <MenuItem value={"Renault"}>Renault</MenuItem>
                            <MenuItem value={"Seat"}>Seat</MenuItem>
                            <MenuItem value={"Smart"}>Smart</MenuItem>
                            <MenuItem value={"Volkswagen"}>Volkswagen</MenuItem>
                        </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="Model">Model</InputLabel>
                        <Select
                        value={modelVal}
                        onChange={handleSelectModel}
                        label="Model"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {/* Dynamically populate based on make chosen */}
                            {populateModels(makeVal, models)}
                        </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="Model">Fuel Type</InputLabel>
                        <Select
                        value={fuelVal}
                        onChange={handleSelectFuel}
                        label="Fuel"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Gasoline"}>Gasoline</MenuItem>
                            <MenuItem value={"Diesel"}>Diesel</MenuItem>
                        </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="minPrice">Min. Price</InputLabel>
                        <Select
                        value={minPrice}
                        onChange={handleSelectMinPrice}
                        label="minPrice"
                        >
                            <MenuItem value="">
                                <em>No Minimum</em>
                            </MenuItem>
                            {prices.map(price => (
                                <MenuItem value={price}>{price}</MenuItem>
                            ))}
                        </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="maxPrice">Max. Price</InputLabel>
                        <Select
                        value={maxPrice}
                        onChange={handleSelectMaxPrice}
                        label="maxPrice"
                        >
                            <MenuItem value="">
                                <em>No Maximum</em>
                            </MenuItem>
                            {prices.map(price => (
                                <MenuItem value={price}>{price}</MenuItem>
                            ))}
                        </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="sort">Sorting</InputLabel>
                        <Select
                        value={sortBy}
                        onChange={handleSelectSortBy}
                        label="sortBy"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="newest">Year Newest</MenuItem>
                            <MenuItem value="oldest">Year Oldest</MenuItem>
                            <MenuItem value="milelow">Low Mileage</MenuItem>
                            <MenuItem value="milehigh">High Mileage</MenuItem>
                            <MenuItem value="cheap">Price Lowest</MenuItem>
                            <MenuItem value="expensive">Price Highest</MenuItem>
                        </Select>
                </FormControl>
                {/* Secondary makes this button red, outlined makes this outlined. */}
                <Button variant="outlined" className={classes.formControl} size="large" color="secondary" onClick={searchForCars}>Search</Button>
            </div>
            {checkNoCars(items)}

            {/* We need to figure out how to order the cards better. Perhaps some math? */}

            <CardColumns>
                {items.map((item) => (
                    <Card className="text-center">
                        <>
                            <div className="card-text-center">
                                <>
                                    {/*****CAR PICTURE FROM DB****/}
                                    {/****NOTE: HAD TO REMOVE HTTPS:// FROM SRC NAME BC JSON ESCAPES ON SLASHES!.....*****/}
                                    <CarInfo car={item}>
                                        <Card.Img
                                            style={{ width: "18rem" }}
                                            variant="top"
                                            src={"https://" + item.image}
                                        />
                                    </CarInfo>
                                    {/****CAR INFO BELOW*****/}
                                    <Card.Title>
                                        <strong>
                                            {item.year + " " + item.make + " " + item.model}{" "}
                                        </strong>
                                    </Card.Title>
                                    <Card.Text> {"Fuel: " + item.fuelType} </Card.Text>
                                    <Card.Text> {"Mileage: " + item.mileage} </Card.Text>
                                    <Card.Text> {"$" + item.price} </Card.Text>
                                </>
                            </div>
                        </>
                    </Card>
                ))}
            </CardColumns>
		    
        </>
    )

}



export default Search;