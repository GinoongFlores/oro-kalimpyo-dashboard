import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Select from "react-select";
import PhoneInput from "react-phone-number-input/input";
import { formatPhoneNumber } from "react-phone-number-input";

import { db } from "../../../firebase";
import { ref, set, update } from "firebase/database";
import { BarangayLists } from "../../selectLists/BarangayLists";
import { UserTypeLists } from "../../selectLists/UserTypeLists";

import "./editUser.scss";

const EditUser = ({ params }) => {
	const { id, number, address, barangay, name, user_type } = params.row;
	const [barangaySelect, setBarangaySelect] = useState(null);
	const [userTypeSelect, setUserTypeSelect] = useState(null);

	const initialValue = {
		id: id,
		number: number,
		address: address,
		barangay: barangay,
		name: name,
		user_type: user_type,
	};

	const regexNumber =
		/(\+?\d{2}?\s?\d{3}\s?\d{3}\s?\d{4})|([0]\d{3}\s?\d{3}\s?\d{4})/g;

	const [state, setState] = useState(initialValue); // handles the all the value of the input fields

	const [numberValue, setNumberValue] = useState();
	const formatNumber = formatPhoneNumber(numberValue);
	const handleNumberChange = (value) => {
		setNumberValue(value);

		setState({ ...state, number: value });
	};

	const [openEdit, setOpenEdit] = useState(false);
	const handleClickOpenEdit = () => {
		setOpenEdit(true);
	};
	const handleCloseEdit = () => {
		setOpenEdit(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // Prevents the page from refreshing
		if (
			!state.name ||
			!state.number ||
			!userTypeSelect ||
			!barangaySelect ||
			!state.address
		) {
			return toast.error("Please fill in all fields");
		} else if (regexNumber.test(formatNumber) === false) {
			toast.error("Please enter a valid Philippine number!");
		} else if (
			(formatNumber.length >= 0 && formatNumber.length <= 12) ||
			formatNumber >= 13
		) {
			toast.error("Philippine number is too long!");
		} else {
			updateUser();
		}
	};

	function updateUser() {
		// update user
		// const userRef = ref(db, `/Nazareth_Users/${id}`);
		// update(userRef, state);

		update(ref(db, `/Nazareth_Users/${id}`), {
			id: id,
			name: state.name,
			address: state.address,
			// email: state.email,
			number: formatNumber,
			barangay: barangaySelect,
			user_type: userTypeSelect,
		})
			.then(() => {
				// Data saved successfully!
				// console.log("Data Added");
				toast.success("User updated successfully");
			})
			.catch((error) => {
				toast.error(error.message);
				// The write failed...
			});
	}

	return (
		<div>
			<button
				onClick={() => {
					handleClickOpenEdit();
				}}
				className="editButton"
			>
				Edit
			</button>

			<Modal
				show={openEdit}
				onHide={handleCloseEdit}
				backdrop="static"
				keyboard={false}
				aria-labelledby="contained-modal-title-vcenter"
				size="lg"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Edit User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className="form" onSubmit={handleSubmit}>
						<Form.Group className="mb-3 fields" controlId="formBasicEmail">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter name"
								name="name"
								value={state.name}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3 fields">
							<Form.Label>Number</Form.Label>
							<PhoneInput
								// name="number"
								className="PhoneInput"
								placeholder="Enter a Philippine number"
								defaultCountry="PH"
								value={state.number}
								onChange={handleNumberChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3 fields">
							<Form.Label>Type of House</Form.Label>
							<Select
								options={UserTypeLists}
								defaultValue={userTypeSelect}
								// defaultInputValue={state.user_type}
								// value={state.user_type}
								placeholder="Select a User Type"
								onChange={(e) => setUserTypeSelect(e.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3 fields">
							<Form.Label>Barangay</Form.Label>
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
								value={state.address}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<div className="buttonCenter">
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</div>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseEdit}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default EditUser;
