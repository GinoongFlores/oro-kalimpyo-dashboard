import "./addUser.scss";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// Firebase
import { auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, push, set, child, onValue } from "firebase/database";

const initialState = {
	name: "",
	number: "",
	email: "",
	password: "",
	confirm_password: "",
	user_type: "",
	barangay: "",
	address: "",
};

const AddUser = () => {
	const [state, setState] = useState(initialState);
	const [genderSelect, setGenderSelect] = useState("");
	const [error, setError] = useState("");

	const {
		name,
		number,
		email,
		password,
		confirm_password,
		user_type,
		barangay,
		address,
	} = state;

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

		// set the value of the select input field
	};
	console.log(state);

	const addUser = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// console.log(user.uid);
				set(ref(db, "/Nazareth_Users/" + user.uid), {
					// set user data to the database with its uid from authentication object and the data from the form input fields
					email: email,
					gender: genderSelect,
					name: name,
					number: number,
					password: password,
					user_type: user_type,
					barangay: barangay,
					address: address,
					id: user.uid,
				});
				toast.success("User added successfully");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;

				toast.error(errorMessage);

				// ..
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // Prevents the page from refreshing

		if (
			!name ||
			!number ||
			!email ||
			!barangay ||
			!address ||
			!user_type ||
			!password ||
			!confirm_password ||
			!genderSelect
		) {
			return toast.error("Please fill in all fields");
		} else if (state.password != state.confirm_password) {
			toast.error("Password does not match");
		} else {
			addUser();
			setState(initialState);
			// toast.success("User added successfully");
		}
	};

	console.log(genderSelect);
	// console.log(state);

	return (
		<>
			<div className="addWrapper">
				<h2 className="addTitle">Add User</h2>
				<button
					onClick={() => {
						handleClickOpenAdd();
					}}
					className="link"
				>
					Add new User
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
					<Modal.Title>Add New User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className="form" onSubmit={handleSubmit}>
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
							<Form.Control
								type="number"
								placeholder="Enter number"
								name="number"
								value={number}
								min="0"
								onChange={handleInputChange}
							/>
						</Form.Group>
						{/* <Form.Group className="mb-3 fields">
							<Form.Label>Gender</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Gender"
								name="gender"
								value={gender}
								onChange={handleInputChange}
							/>
						</Form.Group> */}
						<Form.Group className="mb-3 fields">
							<Form.Label>Gender</Form.Label>
							<Form.Select
								name="gender"
								onChange={(e) => setGenderSelect(e.target.value)}
								aria-label="gender"
								value={genderSelect}
							>
								<option value="">Select Gender</option>
								<option name="gender" value="Male">
									Male
								</option>
								<option name="gender" value="Female">
									Female
								</option>
							</Form.Select>
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
							<Form.Label>Type of House</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Type of House"
								name="user_type"
								value={user_type}
								onChange={handleInputChange}
							/>
						</Form.Group>

						<Form.Group className="mb-3 fields">
							<Form.Label>Barangay</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Barangay"
								name="barangay"
								value={barangay}
								onChange={handleInputChange}
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
