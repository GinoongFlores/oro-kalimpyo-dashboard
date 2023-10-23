// import "./login.scss";

import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useAuthBarangay } from "../../context/BarangayAuthContext";
import * as formik from "formik";
import * as yup from "yup";

// Logos
import Logo from "../../../assets/oro-kalimpyo.png";
import LogoCdo from "../../../assets/cdo-seal.png";
import SlDevs from "../../../assets/sldevs.png";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

const BarangayLogin = () => {
	const { UserLogin } = useAuthBarangay();
	const [showPassword, setShowPassword] = useState(false);

	const { Formik } = formik;
	const schema = yup.object().shape({
		email: yup.string().email("invalid email").required("No Email Provided"),
		password: yup.string().required("No password provided"),
	});

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
				<Formik
					validationSchema={schema}
					onSubmit={async (values) => {
						try {
							await UserLogin(values.email, values.password);
						} catch (error) {
							if (error.code == "auth/user-not-found") {
								toast.error("User not found");
							} else if (error.code == "auth/wrong-password") {
								toast.error("Wrong password");
							} else {
								toast.error(error.message);
							}
						}
					}}
					initialValues={{
						email: "",
						password: "",
					}}
				>
					{({ handleSubmit, handleChange, values, touched, errors }) => (
						<Form
							noValidate
							className="flex flex-col items-center"
							onSubmit={handleSubmit}
						>
							<h2 className="mb-3">Welcome Admin</h2>
							<Form.Group className="mb-3 w-full" controlId="formLogin">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									placeholder="CLENRO authorized email"
									aria-describedby="admin email"
									value={values.email}
									isValid={touched.email && !errors.email}
									isInvalid={!!errors.email}
									name="email"
									onChange={handleChange}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.email}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-3 w-full relative">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type={showPassword ? "text" : "password"}
									placeholder="Enter Password"
									aria-describedby="admin password"
									value={values.password}
									isValid={touched.password && !errors.password}
									isInvalid={!!errors.password}
									name="password"
									onChange={handleChange}
								/>
								<i onClick={togglePasswordVisibility}>
									{showPassword ? (
										<VisibilityOffRoundedIcon className="absolute cursor-pointer top-[40px] bottom-0 right-[35px]" />
									) : (
										<VisibilityRoundedIcon className="absolute cursor-pointer top-[40px] bottom-0 right-[35px]" />
									)}
								</i>
								<Form.Control.Feedback type="invalid">
									{errors.password}
								</Form.Control.Feedback>
							</Form.Group>
							<Button variant="success" size="md" type="submit">
								Login
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default BarangayLogin;
