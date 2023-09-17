import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

const ViewTableModal = (props) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<button onClick={handleShow} className="viewButton">
				View
			</button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				animation={true}
				aria-labelledby="contained-modal-title-vcenter"
				size="lg"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>{props.modalTitle}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{props.specifyForm}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ViewTableModal;
