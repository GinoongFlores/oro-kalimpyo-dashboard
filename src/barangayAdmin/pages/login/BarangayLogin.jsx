// import "./login.scss";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
// import { useAuth } from "../../context/UserAuthContext";

// Logos
import Logo from "../../../assets/oro-kalimpyo.png";
import LogoCdo from "../../../assets/cdo-seal.png";
import SlDevs from "../../../assets/sldevs.png";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

const initialState = {
	email: "",
	password: "",
};

const BarangayLogin = () => {
	// const { UserLogin } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [user, setUser] = useState(initialState);
	const { email, password } = user;

	const handleLogin = async (e) => {
		e.preventDefault();

		if (email.length === 0 || password.length === 0) {
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

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="h-screen flex flex-col md:flex md:flex-row justify-evenly items-center">
			<div className="flex flex-col items-center mb-9">
				<img src={Logo} className="logo-orokalimpyo" alt="oro kalimpyo logo" />
				<div className="flex gap-2 items-center justify-center">
					<div className="logo-cdo">
						<img src={LogoCdo} alt="cagayan de oro logo" />
					</div>
					<div className="logo-sldevs">
						<img src={SlDevs} alt="sl devs logo" />
					</div>
				</div>
			</div>

			<div className="block max-w-lg rounded-lg bg-white p-9 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
				<Form className="flex flex-col items-center" onSubmit={handleLogin}>
					<h2 className="mb-3">Welcome Barangay Admin</h2>
					<Form.Group className="mb-3 w-full" controlId="formLogin">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							placeholder="Barangay authorized email"
							aria-describedby="admin email"
							value={email}
							name="email"
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3 w-full relative">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type={showPassword ? "text" : "password"}
							placeholder="Enter Password"
							aria-describedby="admin password"
							value={password}
							name="password"
							onChange={handleInputChange}
						/>
						<i onClick={togglePasswordVisibility}>
							{showPassword ? (
								<VisibilityOffRoundedIcon className="absolute cursor-pointer top-[40px] bottom-0 right-[18px]" />
							) : (
								<VisibilityRoundedIcon className="absolute cursor-pointer top-[40px] bottom-0 right-[18px]" />
							)}
						</i>
					</Form.Group>
					{error && <p className="text-color-re">{error}</p>}
					<Button variant="success" size="md" type="submit">
						Login
					</Button>
				</Form>
			</div>
		</div>
	);
};

export default BarangayLogin;
