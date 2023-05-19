import "./addUser.scss";
import "react-phone-number-input/style.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import PhoneInput from "react-phone-number-input/input";
import {
	isValidPhoneNumber,
	formatPhoneNumber,
	isPossiblePhoneNumber,
} from "react-phone-number-input";

// Firebase
import { auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, push, set, child, onValue } from "firebase/database";

import { BarangayLists } from "../../barangayLists/BarangayLists";

const initialState = {
	name: "",
	number: "",
	email: "",
	password: "",
	barangay: "",
	confirm_password: "",
	address: "",
};

const AddUser = () => {
	const [state, setState] = useState(initialState)
	const [barangaySelect, setBarangaySelect] = useState(null);
	const { name, number, email, password, confirm_password, address } = state;
	const [numberValue, setNumberValue] = useState();
	const formatNumber = formatPhoneNumber(numberValue);

	const testNumber = "+639123459852";

	const regexNumber =
		/(\+?\d{2}?\s?\d{3}\s?\d{3}\s?\d{4})|([0]\d{3}\s?\d{3}\s?\d{4})/g;

	// console.log(regexNumber.test(possibleNumber))

	// Modal
	const [openAdd, setOpenAdd] = useState(false);
	const handleClickOpenAdd = () => {
		setOpenAdd(true);
	};
	const handleCloseAdd = () => {
		setOpenAdd(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
		// const objVal = { ...state, [e.target.name]: e.target.value };
		// setState(objVal);
	};

	const handleNumberChange = (value) => {
		setNumberValue(value);

		setState({ ...state, number: value });
	};

	// console.log(barangaySelect);
	// console.log(state);

	const addUser = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// console.log(user.uid);
				set(ref(db, "/BarangayAdmin/" + user.uid), {
					// set user data to the database with its uid from authentication object and the data from the form input fields
					email: email,
					name: name,
					number: formatNumber,
					password: password,
					barangay: barangaySelect,
					address: address,
					id: user.uid,
				});
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				toast.error(errorCode, errorMessage);
				// ..
			});
	};

	// console.log(state.number);

	// if (regexNumber.test(formatNumber) === false) {
	// 	console.log("invalid");
	// } else if (
	// 	(formatNumber.length >= 0 && formatNumber.length <= 12) ||
	// 	formatNumber >= 13
	// ) {
	// 	console.log("invalid");
	// } else {
	// 	console.log("valid");
	// }

	const passwordValidation =
		/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

	const handleSubmitData = (e) => {
		e.preventDefault(); // Prevents the page from refreshing

		if (
			!password ||
			!confirm_password ||
			!name |
			!formatNumber ||
			!email ||
			!barangaySelect ||
			!address
		) {
			return toast.error("Please fill in all fields");
			// } else if (passwordValidation.test(!password)) {
			// 	return toast.error("Please enter a valid number");
			// }
		} else if (regexNumber.test(formatNumber) === false) {
			toast.error("Please enter a valid Philippine number!");
		} else if (
			(formatNumber.length >= 0 && formatNumber.length <= 12) ||
			formatNumber >= 13
		) {
			toast.error("Philippine number is too long!");
		} else if (state.password != state.confirm_password) {
			toast.error("Password does not match");
		} else {
			addUser();
			setState(initialState);
			toast.success("User added successfully");
		}
	};

	// console.log(state);

	return (
		<>
			<div className="addWrapper">
				<h2 className="addTitle">Add Barangay Admin</h2>
				<button
					onClick={() => {
						handleClickOpenAdd();
					}}
					className="link"
				>
					Add new Barangay Admin
				</button>
			</div>

			<Modal
				show={openAdd}
				onHide={handleCloseAdd}
				backdrop="static"
				keyboard={false}
				aria-labelledby="contained-modal-title-vcenter"
				size="lg"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Add A Barangay Admin</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className="form" name="addUser" onSubmit={handleSubmitData}>
						<Form.Group className="mb-3 fields" controlId="formBasicEmail">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter name"
								name="name"
								value={name}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3 fields">
							<Form.Label>Number</Form.Label>
							{/* <Form.Control
								type="number"
								placeholder="Enter number"
								name="number"
								value={number}
								pattern="((\+[0-9]{2})|0)[.\- ]?9[0-9]{2}[.\- ]?[0-9]{3}[.\- ]?[0-9]{4}"
								min="0"
								onChange={handleInputChange}
							/> */}
							<PhoneInput
								name="number"
								className="PhoneInput"
								placeholder="Enter number"
								defaultCountry="PH"
								value={numberValue}
								onChange={handleNumberChange}
							/>
						</Form.Group>

						<Form.Group className="mb-3 fields">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter Email"
								name="email"
								value={email}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3 fields">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter Password"
								name="password"
								value={password}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3 fields">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter Password"
								name="confirm_password"
								value={confirm_password}
								onChange={handleInputChange}
							/>
						</Form.Group>

						<Form.Group className="mb-3 fields">
							<Form.Label>Barangay</Form.Label>
							{/* <Form.Select
								value={barangaySelect}
								onChange={(e) => setBarangaySelect(e.target.value)}
								isSearchable={true}
							>
								{BarangayLists.map((barangayList) => (
									<option key={barangayList.value} value={barangayList.value}>
										{barangayList.text.toUpperCase()}
									</option>
								))}
							</Form.Select> */}
							<Select
								options={BarangayLists}
								defaultValue={barangaySelect}
								placeholder="Select a Barangay"
								onChange={(e) => setBarangaySelect(e.value)}
							/>
						</Form.Group>

						<Form.Group className="mb-3 fields">
							<Form.Label>Address</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Address"
								name="address"
								value={address}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<div className="buttonCenter">
							<Button variant="primary" className="viewBtn" type="submit">
								Submit
							</Button>
						</div>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseAdd}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddUser;
