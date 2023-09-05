import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as formik from "formik";
import * as yup from "yup";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useState } from "react";

const AddClenroAdmin = () => {
	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const { Formik } = formik;
	const schema = yup.object().shape({
		firstName: yup.string().required("No First Name Provided"),
		lastName: yup.string().required("No Last Name Provided"),
		email: yup.string().email().required("No Email Provided"),
		password: yup
			.string()
			.required("No password provided")
			.min(8, "Password is too short! - Should be 8 characters long.")
			.matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
		confirmPassword: yup
			.string()
			.required("No password provided")
			.oneOf([yup.ref("password"), null], "Password must match"),
	});

	return (
		<>
			<Formik
				validationSchema={schema}
				onSubmit={(values) => {
					console.log(values);
				}}
				initialValues={{
					firstName: "",
					lastName: "",
					email: "",
					password: "",
					confirmPassword: "",
				}}
			>
				{({ handleSubmit, handleChange, values, touched, errors }) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Row className="mb-3">
							<Form.Group
								as={Col}
								md="6"
								className="mb-3"
								controlId="validationFormik01"
							>
								<Form.Label>First Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Juan"
									name="firstName"
									value={values.firstName}
									onChange={handleChange}
									isValid={touched.firstName && !errors.firstName}
									isInvalid={!!errors.firstName}
									autoComplete="name"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.firstName}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group
								className="mb-3"
								as={Col}
								md="6"
								controlId="validationFormik02"
							>
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Dela Cruz"
									name="lastName"
									value={values.lastName}
									onChange={handleChange}
									isValid={touched.lastName && !errors.lastName}
									isInvalid={!!errors.lastName}
									autoComplete="family-name"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.lastName}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group
								className="mb-3"
								as={Col}
								md="12"
								controlId="validationFormikEmail"
							>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									placeholder="juandelacruz@gmail.com"
									name="email"
									value={values.email}
									onChange={handleChange}
									isValid={touched.email && !errors.email}
									isInvalid={!!errors.email}
									autoComplete="email"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.email}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group
								className="mb-3 relative"
								as={Col}
								md="6"
								controlId="validationFormikPassword"
							>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type={showPassword ? "text" : "password"}
									placeholder="enter password"
									name="password"
									value={values.password}
									onChange={handleChange}
									isValid={touched.password && !errors.password}
									isInvalid={!!errors.password}
									autoComplete="current-password"
								/>
								<i onClick={togglePasswordVisibility}>
									{showPassword ? (
										<VisibilityOffRoundedIcon className="absolute cursor-pointer top-[40px] bottom-0 right-[40px]" />
									) : (
										<VisibilityRoundedIcon className="absolute cursor-pointer top-[40px] bottom-0 right-[40px]" />
									)}
								</i>
								<Form.Control.Feedback type="invalid">
									{errors.password}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group
								className="mb-3 relative"
								as={Col}
								md="6"
								controlId="validationFormikConfirmPassword"
							>
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type={showPassword ? "text" : "password"}
									placeholder="retype password"
									name="confirmPassword"
									value={values.confirmPassword}
									onChange={handleChange}
									isValid={touched.confirmPassword && !errors.confirmPassword}
									isInvalid={!!errors.confirmPassword}
									autoComplete="current-password"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.confirmPassword}
								</Form.Control.Feedback>
							</Form.Group>
						</Row>
						<div className="mb-3 flex justify-center">
							<Button md="4" type="submit" variant="success">
								Submit an Admin
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default AddClenroAdmin;
