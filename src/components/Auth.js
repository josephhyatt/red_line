import React, { useEffect, useState } from "react";
import fire from "./Fire";

export const AuthContext = React.createContext();

// Store authentication status
export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [pending, setPending] = useState(true);

	//Hook to watch for auth changes
	useEffect(() => {
		fire.auth().onAuthStateChanged((user) => {
			setCurrentUser(user);
			setPending(false);
		});
	}, []);

	//Firebase auth will take too long so we force it to wait until we have an auth context.
	//This will make the page take time to load, potentially bad for nonfunctional requirements if left unchecked.
	if (pending) {
		return <>Loading...</>;
	}

	return (
		//display whatever was passed in.
		<AuthContext.Provider value={{ currentUser }}>
			{" "}
			{children}{" "}
		</AuthContext.Provider>
	);
};
