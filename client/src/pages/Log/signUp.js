import React, { useState } from "react";
import axios from "axios";
import "../../styles/components/signUp.scss";

const SignUp = () => {
	const [ firstName, setFirstName ] = useState("");
	const [ lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [controlPassword, setControlPassword] = useState("");

	const handleRegister = async (e) => {
		e.preventDefault();
		const emailError = document.querySelector(".email-error");
		const firstNameError = document.querySelector(".firstName-error");
		const lastNameError = document.querySelector(".lastName-error");
		const passwordError = document.querySelector(".password-error");
		const controlPasswordError = document.querySelector(
			".controlPassword-error"
		);

		axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}api/user/register`,

			data: {
				email,
				firstName,
				lastName,
				password,
				controlPassword,
			},
		})
			.then((res) => {
				if (password !== controlPassword) {
					controlPasswordError.insertAdjacentHTML(
						"afterbegin",
						'<p> les mots de passe ne corrrespondent pas'
					);
				}
				if (res.data.errors) {
					emailError.insertAdjacentHTML("afterbegin", res.data.errors.email);
					firstNameError.insertAdjacentHTML(
						"afterbegin",
						res.data.errors.firstName
					);
					lastNameError.insertAdjacentHTML(
						"afterbegin",
						res.data.errors.lastName
					);
					passwordError.insertAdjacentHTML(
						"afterbegin",
						res.data.errors.password
					);

				} else {
					window.location = "/accueil";
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="signup">
			<div className="signup-wrapper">
				<h1 className="create-acc">Créer un compte</h1>
				<div className="signup-form">
					<h3 className="title">Bienvenue sur le workplace Groupomania !</h3>
					<form action="" onSubmit={handleRegister} className="signup-fields">
						
							<label htmlFor="email">Email :</label>
							<input
								type="text"
								className="single-field"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
							/>
							<div className="email-error"></div>
							<div className="fn-field">
								<label htmlFor="prénom">Prénom: </label>
								<input
									type="text"
									className="single-field"
									onChange={(e) => setFirstName(e.target.value)}
									value={firstName}
								/>
								<div className="firstName-error"></div>
							</div>
							<div className="ln-field">
								<label htmlFor="nom">Nom: </label>
								<input
									type="text"
									className="single-field"
									onChange={(e) => setLastName(e.target.value)}
									value={lastName}
								/>
								<div className="lastName-error"></div>
							</div>
							<div className="password-field">
								<label htmlFor="password">Mot de passe: </label>
								<input
									type="password"
									className="single-field"
									onChange={(e) => setPassword(e.target.value)}
									value={password}
									minlength="6" required
								/>
								<div className="password-error"></div>
							</div>
							<div className="confirm-field">
								<label htmlFor="password">Confirmez le Mot de passe: </label>
								<input
									type="password"
									className="single-field"
									onChange={(e) => setControlPassword(e.target.value)}
									value={controlPassword}
									minlength="6" required
								/>
								<div className="control-error"></div>
							</div>
							<div className="btn">
								<button type="submit " className="submit-btn">
									Créer un compte
								</button>
							</div>
						
						<h6 className="terms-condition">
							I have read &amp; accepted the{" "}
							<button className="terms-btn">terms of use</button>
						</h6>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
