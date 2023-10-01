import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as formik from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useState, useEffect } from "react";
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
		name: yup.string().required("No Collector's Name Provided"),
		contact_person: yup.string().required("No Contact Person's Name Provided"),
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
		number: yup
			.string()
			.required("No Number Provided")
			.max(11, "Number is too long! - Should be 11 characters long.")
			.matches(philippineNumberRegex, "Invalid Number"),
		collector_type: yup.string().required("No User Type Provided"),
		accreditationNo: yup.mixed().when("collector_type", (collector_type) => {
			if (collector_type === "Private Collector") {
				return yup.number().required("No Accreditation No. Provided");
			} else {
				return yup.string().default("N/A");
			}
		}),
	});

	const addCollector = async (
		id,
		name,
		email,
		password,
		contact_person,
		collector_type,
		accreditationNo,
		number
	) => {
		const docRef = doc(db, "Waste Collector", id);

		const docData = {
			id,
			name,
			email,
			password,
			contact_person,
			collector_type,
			accreditationNo,
			number,
			date_created: new Date().toLocaleString(),
		};
		await setDoc(docRef, docData, { merge: true });
	};

	return (
		<>
			<Formik
				validationSchema={schema}
				onSubmit={(values) => {
					console.log(values);
					createUserWithEmailAndPassword(auth, values.email, values.password)
						.then((userCredential) => {
							const user = userCredential.user;
							addCollector(
								user?.uid,
								values.name,
								values.email,
								values.password,
								values.contact_person,
								values.collector_type,
								values.accreditationNo,
								values.number
							);
							toast.success("Successfully added a collector");
						})
						.catch((error) => {
							const errorCode = error.code;
							const errorMessage = error.message;
							toast.error(errorCode, errorMessage);
							console.log(errorCode, errorMessage);
						});
				}}
				initialValues={{
					name: "",
					email: "",
					password: "",
					confirmPassword: "",
					contact_person: "",
					collector_type: "",
					accreditationNo: "",
					number: "",
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
									placeholder="Full Name of Collector"
									name="name"
									value={values.name}
									onChange={handleChange}
									isValid={touched.name && !errors.name}
									isInvalid={!!errors.name}
									autoComplete="name"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.name}
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
									name="contact_person"
									value={values.contact_person}
									onChange={handleChange}
									isValid={touched.contact_person && !errors.contact_person}
									isInvalid={!!errors.contact_person}
									autoComplete="contact_person"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.contact_person}
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
									name="collector_type"
									value={values.collector_type}
									onChange={(e) => {
										handleChange(e);
										handleUserTypeChange(e);
									}}
									isValid={touched.collector_type && !errors.collector_type}
									isInvalid={!!errors.collector_type}
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
									{errors.collector_type}
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
									name="number"
									autoComplete="number"
									value={values.number}
									onChange={handleChange}
									isValid={touched.number && !errors.number}
									isInvalid={!!errors.number}
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
									{errors.number}
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
