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
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

const initialState = {
	email: "",
	password: "",
};

const SignUp = () => {
	const { UserSignup } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [user, setUser] = useState(initialState);
	const { email, password } = user;

	const handleSignup = async (e) => {
		e.preventDefault();

		if (!email || !password) {
			setError("");
			toast.error("Please fill in all fields");
		}
		try {
			await UserSignup(email, password);
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
			<Form className="loginForm" onSubmit={handleSignup}>
				<h2 className="titleForm">Signup</h2>
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
				<Form.Group className="mb-3 password">
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
							<VisibilityOffRoundedIcon className="icon" />
						) : (
							<VisibilityRoundedIcon className="icon" />
						)}
					</i>
				</Form.Group>

				{error && <p className="error">{error}</p>}
				<Button variant="success" size="md" type="submit">
					Login
				</Button>
				<Link to="/login">Already have an account?</Link>
			</Form>
		</div>
	);
};

export default SignUp;