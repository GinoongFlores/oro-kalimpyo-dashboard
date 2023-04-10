import "./login.scss";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useAuth } from "../../context/UserAuthContext";

// Logos
import Logo from "../../assets/oro-kalimpyo.png";
import LogoCdo from "../../assets/cdo-seal.png";
import SlDevs from "../../assets/sldevs.png";

const initialState = {
	email: "",
	password: "",
};

const Login = () => {
	const { UserLogin } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState(false);
	const [user, setUser] = useState(initialState);
	const { email, password } = user;

	const handleLogin = async (e) => {
		e.preventDefault();

		if (!email || !password) {
			setError("");
			toast.error("Please fill in all fields");
		}
		try {
			await UserLogin(email, password);
		} catch (error) {
			if (error.code == "auth/user-not-found") {
				setError("");
				// toast.error("User not found");
				return setError("User Not Found");
			} else if (error.code == "auth/wrong-password") {
				setError("");
				// toast.error("Wrong password");
				return setError("Wrong Password");
			} else {
				setError("");
				return setError(`${error.message}`);
			}
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	return (
		<div className="formWrapper">
			<div className="formHeader">
				<img src={Logo} className="logo-orokalimpyo" alt="oro kalimpyo logo" />
				<div className="logoRow">
					<div className="logo-cdo">
						<img src={LogoCdo} alt="cagayan de oro logo" />
					</div>
					<div className="logo-sldevs">
						<img src={SlDevs} alt="sl devs logo" />
					</div>
				</div>
			</div>
			<Form className="loginForm" onSubmit={handleLogin}>
				<h2 className="titleForm">Nazareth Barangay Admin</h2>
				<Form.Group className="mb-3" controlId="formLogin">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Barangay's Admin Email"
						aria-describedby="admin email"
						value={email}
						name="email"
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter Password"
						aria-describedby="admin password"
						value={password}
						name="password"
						onChange={handleInputChange}
					/>
				</Form.Group>
				{error && <p className="error">{error}</p>}
				<Button variant="success" size="md" type="submit">
					Login
				</Button>
			</Form>
		</div>
	);
};

export default Login;
