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
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const collectorLists = [
	{
		value: "",
		label: "Select a User Type",
	},
	{
		value: "Barangay Collector",
		label: "Barangay Collector",
	},
	{
		value: "City Collector",
		label: "City Collector",
	},
	{
		value: "Private Collector",
		label: "Private Collector",
	},
];

const AddCollector = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showAccreditationNo, setShowAccreditationNo] = useState(false);
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleUserTypeChange = (event) => {
		const userType = event.target.value;
		const selectedCollector = collectorLists.find(
			(collector) => collector.value === userType
		);
		setShowAccreditationNo(selectedCollector.label === "Private Collector");
	};

	const { Formik } = formik;
	const philippineNumberRegex = /^(\+)(\d){12}$|^\d{11}$/;
	const schema = yup.object().shape({
		collectorFullName: yup.string().required("No Collector's Name Provided"),
		contactPersonFullName: yup
			.string()
			.required("No Contact Person's Name Provided"),
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
		user_type: yup.string().required("No User Type Provided"),
		accreditationNo: yup
			.number()
			.typeError("Accreditation No. must be a number")
			.required("No Accreditation No. Provided"),
		philippineNumber: yup
			.string()
			.required("No Number Provided")
			.max(11, "Number is too long! - Should be 11 characters long.")
			.matches(philippineNumberRegex, "Invalid Number"),
	});

	const addCollector = async (
		id,
		collectorFullName,
		email,
		password,
		contactPersonFullName,
		user_type,
		accreditationNo,
		philippineNumber
	) => {
		const docRef = doc(db, "Collectors", id);
		const docData = {
			collectorFullName,
			email,
			password,
			contactPersonFullName,
			philippineNumber,
			user_type,
			accreditationNo,
			id,
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
							addCollector(
								user?.uid,
								values.collectorFullName,
								values.email,
								values.password,
								values.contactPersonFullName,
								values.philippineNumber,
								values.user_type,
								values.accreditationNo
							);
							toast.success("Successfully added a collector");
						})
						.catch((error) => {
							const errorCode = error.code;
							const errorMessage = error.message;
							toast.error(errorCode, errorMessage);
						});
				}}
				initialValues={{
					collectorFullName: "",
					email: "",
					password: "",
					contactPersonFullName: "",
					user_type: "",
					accreditationNo: "",
					philippineNumber: "",
				}}
			>
				{({ handleSubmit, handleChange, values, touched, errors }) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Row className="mb-3">
							<Form.Group
								as={Col}
								md="12"
								className="mb-3"
								controlId="validationFormik01"
							>
								<Form.Label>Collector's Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="MRF Coop"
									name="collectorFullName"
									value={values.collectorFullName}
									onChange={handleChange}
									isValid={
										touched.collectorFullName && !errors.collectorFullName
									}
									isInvalid={!!errors.collectorFullName}
									autoComplete="collectorFullName"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.collectorFullName}
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
								<Form.Label>Contact Person's Full Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Dela Cruz, Juan"
									name="contactPersonFullName"
									value={values.contactPersonFullName}
									onChange={handleChange}
									isValid={
										touched.contactPersonFullName &&
										!errors.contactPersonFullName
									}
									isInvalid={!!errors.contactPersonFullName}
									autoComplete="contactPersonFullName"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.contactPersonFullName}
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
									name="user_type"
									value={values.user_type}
									onChange={(e) => {
										handleChange(e);
										handleUserTypeChange(e);
									}}
									isValid={touched.user_type && !errors.user_type}
									isInvalid={!!errors.user_type}
								>
									{collectorLists.map((collector, index) => {
										return (
											<option key={index} value={collector.value}>
												{collector.label}
											</option>
										);
									})}
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.user_type}
								</Form.Control.Feedback>
							</Form.Group>

							{showAccreditationNo && (
								<Form.Group
									className="mb-3"
									as={Col}
									md="12"
									controlId="validationFormikAddress"
								>
									<Form.Label>Accreditation No.</Form.Label>
									<Form.Control
										type="text"
										placeholder="123456789"
										name="accreditationNo"
										value={values.accreditationNo}
										onChange={handleChange}
										isValid={touched.accreditationNo && !errors.accreditationNo}
										isInvalid={!!errors.accreditationNo}
										autoComplete="accreditationNo"
									/>
									<Form.Control.Feedback type="invalid">
										{errors.accreditationNo}
									</Form.Control.Feedback>
								</Form.Group>
							)}

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
								Add a Collector
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default AddCollector;
