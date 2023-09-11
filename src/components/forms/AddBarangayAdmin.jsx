import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as formik from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useState } from "react";
import { BarangayLists } from "../../data/BarangayLists";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const AddBarangayAdmin = () => {
	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const { Formik } = formik;
	const philippineNumberRegex = /^(\+)(\d){12}$|^\d{11}$/;
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
		address: yup.string().required("No Address Provided"),
		barangay: yup.string().required("No Barangay Provided"),
		philippineNumber: yup
			.string()
			.required("No Number Provided")
			.max(11, "Number is too long! - Should be 11 characters long.")
			.matches(philippineNumberRegex, "Invalid Number"),
	});

	const addBarangayAdmin = async (
		id,
		firstName,
		lastName,
		email,
		password,
		address,
		barangay,
		philippineNumber
	) => {
		const docRef = doc(db, "Admins", id);
		const docData = {
			firstName,
			lastName,
			email,
			password,
			address,
			barangay,
			philippineNumber,
			id,
			role: "BarangayAdmin",
			createdAt: new Date().toLocaleString(),
		};
		await setDoc(docRef, docData, { merge: true });
	};

	return (
		<>
			<Formik
				validationSchema={schema}
				onSubmit={(values) => {
					createUserWithEmailAndPassword(auth, values.email, values.password)
						.then((userCredential) => {
							const user = userCredential.user;
							addBarangayAdmin(
								user?.uid,
								values.firstName,
								values.lastName,
								values.email,
								values.password,
								values.address,
								values.barangay,
								values.philippineNumber
							);
							toast.success("Successfully added a barangay admin");
						})
						.catch((error) => {
							const errorCode = error.code;
							const errorMessage = error.message;
							toast.error(errorCode, errorMessage);
						});
				}}
				initialValues={{
					firstName: "",
					lastName: "",
					email: "",
					password: "",
					confirmPassword: "",
					address: "",
					philippineNumber: "",
					barangay: "",
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

							<Form.Group
								className="mb-3"
								as={Col}
								md="12"
								controlId="validationFormikAddress"
							>
								<Form.Label>Address</Form.Label>
								<Form.Control
									type="text"
									placeholder="Justo Ramonal, St."
									name="address"
									value={values.address}
									onChange={handleChange}
									isValid={touched.address && !errors.address}
									isInvalid={!!errors.address}
									autoComplete="address"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.address}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group
								className="mb-3"
								as={Col}
								md="12"
								aria-label="Default select example"
								controlId="validationFormikSelect"
							>
								<Form.Select
									name="barangay"
									value={values.barangay}
									onChange={handleChange}
									isValid={touched.barangay && !errors.barangay}
									isInvalid={!!errors.barangay}
								>
									{BarangayLists.map((barangay, index) => {
										return (
											<option key={index} value={barangay.value}>
												{barangay.label}
											</option>
										);
									})}
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.barangay}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group
								className="mb-3"
								as={Col}
								md="12"
								controlId="validationFormikNumber"
							>
								<Form.Label>Number</Form.Label>
								<Form.Control
									type="tel"
									placeholder="0912345673"
									name="philippineNumber"
									autoComplete="number"
									value={values.philippineNumber}
									onChange={handleChange}
									isValid={touched.philippineNumber && !errors.philippineNumber}
									isInvalid={!!errors.philippineNumber}
									onKeyDown={(event) => {
										if (
											isNaN(Number(event.key)) &&
											event.key !== "Backspace" &&
											!(
												event.ctrlKey &&
												(event.key === "c" || event.key === "v")
											)
										) {
											event.preventDefault();
										}
									}}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.philippineNumber}
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

export default AddBarangayAdmin;
