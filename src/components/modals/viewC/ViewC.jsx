import "./viewC.scss";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// firebase
import { db } from "../../../firebase";
import { ref, onValue } from "firebase/database";

import { useEffect, useState } from "react";

const ViewC = ({ params }) => {
	const {
		id,
		name,
		number,
		type,
		address,
		barangay,
		brand,
		kilo,
		total_kilo,
		total_contributions,
		plastic,
		time,
		date,
	} = params.row;

	// The values object holds the values of the params.row object to be used in the useState hook
	const values = {
		id: id,
		name: name,
		number: number,
		type: type,
		address: address,
		barangay: barangay,
		brand: brand,
		kilo: kilo,
		total_kilo: total_kilo,
		total_contributions: total_contributions,
		plastic: plastic,
		time,
		date: date,
	};

	const [readUser, setReadUser] = useState(values); // this is the state that will be used to display the data in the modal

	// Modal
	const [openView, setOpenView] = useState(false);
	const handleClickOpenView = () => {
		setOpenView(true);
	};
	const handleCloseView = () => {
		setOpenView(false);
	};

	const viewSpecified = () => {
		const userRef = ref(db, `/Nazareth_C_Contributions/${id}`);
		onValue(userRef, (snapshot) => {
			const data = snapshot.val();
			setReadUser(data);
		});
	};

	useEffect(() => {
		viewSpecified();
	}, []);

	return (
		<>
			<button
				className="viewButton"
				onClick={() => {
					handleClickOpenView();
				}}
			>
				View
			</button>
			<Modal
				show={openView}
				onHide={handleCloseView}
				backdrop="static"
				keyboard={false}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Completed Contributions</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="item--viewPage">
						<div className="details--viewPage">
							<div className="detailItem">
								<span className="itemKey">ID: </span>
								<span className="itemValue">{readUser?.id}</span>
							</div>
							<div className="detailItem">
								<span className="itemKey">Name: </span>
								<span className="itemValue">{readUser?.name}</span>
							</div>
							<div className="detailItem">
								<span className="itemKey">Number: </span>
								<span className="itemValue">{readUser?.number}</span>
							</div>
							<div className="detailItem">
								<span className="itemKey">Type of Household: </span>
								<span className="itemValue">{readUser?.type}</span>
							</div>
							<div className="detailItem">
								<span className="itemKey">Address: </span>
								<span className="itemValue">{readUser?.address}</span>
							</div>
							<div className="detailItem">
								<span className="itemKey">Barangay: </span>
								<span className="itemValue">{readUser?.barangay}</span>
							</div>
							<div className="detailItem">
								<span className="itemKey">Brand Collected: </span>
								<span className="itemValue">{readUser?.brand}</span>
							</div>
							<div className="detailItem">
								<span className="itemKey">Kilo: </span>
								<span className="itemValue">{readUser?.kilo}</span>
							</div>
							<div className="detailItem">
								<span className="itemKey">Total Kilo: </span>
								<span className="itemValue">{readUser?.total_kilo}</span>
							</div>
							<div className="detailItem">
								<span className="itemKey">Type of plastic: </span>
								<span className="itemValue">{readUser?.plastic}</span>
							</div>
							<div className="detailItem">
								<span className="itemKey">Total Contributions: </span>
								<span className="itemValue">
									{readUser?.total_contributions}
								</span>
							</div>
							<div className="detailItem">
								<span className="itemKey">Time: </span>
								<span className="itemValue">{readUser?.time}</span>
							</div>
							<div className="detailItem">
								<span className="itemKey">Date: </span>
								<span className="itemValue">{readUser?.date}</span>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						className="viewBtn"
						onClick={handleCloseView}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ViewC;