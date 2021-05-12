import React, { useEffect, useContext, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import fire from "./Fire";

//Route only if we have a logged in user.
export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
	const { currentUser } = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={(routeProps) =>
				//!! means convert object to True or False, so !!currentUser means if a user exists, it is converted to true.
				!!currentUser ? (
					<RouteComponent {...routeProps} />
				) : (
					<Redirect to={"/"} />
				)
			}
		/>
	);
};

//Route only if user has priv > 0
export const EmployeeRoute = ({ component: RouteComponent, ...rest }) => {
	const { currentUser } = useContext(AuthContext);
	const [priv, setPriv] = useState(0);
	const [pending, setPending] = useState(true);

	//Hook to watch for auth changes
	useEffect(() => {
		let unmounted = false;
		const checkPriv = () => {
			if (currentUser) {
				var db = fire.firestore();
				var userID = String(currentUser.uid);
				db.collection("userInfo")
					.where("id", "==", userID)
					.get()
					.then((doc) => {
						if (!unmounted) {
							doc.forEach((user) => {
								if (user.data().priv > 0) {
									//console.log(user.data().priv)
									setPriv(user.data().priv);
								}
							});
							setPending(false);
						}
					});
			}
		};
		checkPriv();
		return () => {
			unmounted = true;
		};
	}, []);

	//console.log(priv > 0);
	//Firebase auth will take too long so we force it to wait until we have an auth context.
	if (pending && currentUser) {
		return <>Verifying Credentials...</>;
	}
	return (
		<Route
			{...rest}
			render={(routeProps) =>
				//!! means convert object to True or False, so !!currentUser means if a user exists, it is converted to true.
				priv > 0 ? <RouteComponent {...routeProps} /> : <Redirect to={"/"} />
			}
		/>
	);
};

//Route only if user has priv > 1
export const ManagerRoute = ({ component: RouteComponent, ...rest }) => {
	const { currentUser } = useContext(AuthContext);
	const [priv, setPriv] = useState(0);
	const [pending, setPending] = useState(true);

	//Hook to watch for auth changes
	useEffect(() => {
		let unmounted = false;
		const checkPriv = () => {
			if (currentUser) {
				var db = fire.firestore();
				var userID = String(currentUser.uid);
				db.collection("userInfo")
					.where("id", "==", userID)
					.get()
					.then((doc) => {
						if (!unmounted) {
							doc.forEach((user) => {
								if (user.data().priv > 1) {
									//console.log(user.data().priv)
									setPriv(user.data().priv);
								}
							});
							setPending(false);
						}
					});
			}
		};
		checkPriv();
		return () => {
			unmounted = true;
		};
	}, []);

	//console.log(priv > 1);
	//Firebase auth will take too long so we force it to wait until we have an auth context.
	if (pending && currentUser) {
		return <>Verifying Credentials...</>;
	}

	return (
		<Route
			{...rest}
			render={(routeProps) =>
				//!! means convert object to True or False, so !!currentUser means if a user exists, it is converted to true.
				priv > 1 ? <RouteComponent {...routeProps} /> : <Redirect to={"/"} />
			}
		/>
	);
};

export default PrivateRoute;
