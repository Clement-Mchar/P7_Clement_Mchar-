import React from "react";
import "./log.scss";
import SignIn from "./signIn";
import SignUp from "./signUp";
const Log = () => {
	return (
		<div className="connexion-page flex">
			<div className="connexion-header flex">
				<div className="connexion-logo flex">
					<img src="./img/icon.png" alt="logo groupomania" />
				</div>
				<SignIn />
			</div>
			<div className="page-wrapper flex">
				<div className="img-wrapper">
					<img src="./img/groupomania-connexion.png" alt="groupomania-name" />
				</div>
				<SignUp />
			</div>
		</div>
	);
};

export default Log;
