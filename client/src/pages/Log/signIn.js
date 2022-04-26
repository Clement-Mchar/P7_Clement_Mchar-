import React, { useState } from "react";
import axios from "axios";
import "./signIn.scss";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleLogin = (e) => {
		e.preventDefault();
		const emailError = document.querySelector(".email-error");
		const passwordError = document.querySelector(".password-error");

		axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}api/user/login`,

			data: {
				email,
				password,
			},
		})
			.then((res) => {
				if (res.data.errors) {
					emailError.insertAdjacentHTML("afterbegin", res.data.errors.email);
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
		<div className="login flex">
			<div className="login-area flex">
				<form action="" onSubmit={handleLogin} className="form-field">
					<div className="form email">
						<label htmlFor="email">Email :</label>
						<input
							type="text"
							className="single-field"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
						<div className="email-error"></div>
					</div>
					<div className="form password">
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

						<input type="submit" 
						value="Se connecter" className="login-btn" />
				
				</form>
			</div>
		</div>
	);
};

export default SignIn;
