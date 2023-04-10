import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import { db } from "../../../firebase";
import { ref, set, update } from "firebase/database";

import "./editUser.scss";
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS

const EditUser = ({ params }) => {
	const { id, number, address, barangay, password, name, email } = params.row;

	const initialValue = {
		id: id,
		number: number,
		address: address,
		barangay: barangay,
		password: password,
		name: name,
		email: email,
	};

	const [state, setState] = useState(initialValue); // handles the all the value of the input fields

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
			!state.password ||
			!state.email ||
			!state.barangay ||
			!state.address
		) {
			return toast.error("Please fill in all fields");
		} else {
			updateUser();
		}
	};

	function updateUser() {
		// update user
		const userRef = ref(db, `/BarangayAdmin/${id}`);
		update(userRef, state);
		toast.success("An Admin updated successfully");

		// { previous version
		// 	set(ref(db, "Nazareth_Users/" + id), {
		// 		id: id,
		// 		address: state.address,
		// 		barangay: state.barangay,
		// 		email: state.email,
		// 		gender: state.gender,
		// 		name: state.name,
		// 		number: state.number,
		// 		password: state.password,
		// 		user_type: state.user_type,
		// 	})
		// 		.then(() => {
		// 			// Data saved successfully!
		// 			// console.log("Data Added");
		// 		})
		// 		.catch((error) => {
		// 			toast.error(error.message);
		// 			// The write failed...
		// 		});
		// }
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
					<Modal.Title>Update an Admin</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className="form" onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter New Name"
								name="name"
								value={state.name}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Number</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter New Number"
								name="number"
								value={state.number}
								min="0"
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter New Email"
								name="email"
								value={state.email}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter New Password"
								name="password"
								value={state.password}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Barangay</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Barangay"
								name="barangay"
								value={state.barangay}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
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
