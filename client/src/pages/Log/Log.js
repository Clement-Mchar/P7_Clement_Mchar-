import React from "react";
import "../../styles/pages/log.scss";
import SignIn from "./signIn";
import SignUp from "./signUp";
const Log = () => {
	return (
		<div className="connexion-page">
			<div className="connexion-header">
				<div className="connexion-logo">
					<img src="./img/icon.png" alt="logo groupomania" />
				</div>
				<SignIn />
			</div>
			<div className="page-wrapper">
				<div className="img-wrapper">
					<img src="./img/groupomania-connexion.png" alt="groupomania-name" />
				</div>
				<SignUp />
			</div>
		</div>
	);
};

export default Log;
