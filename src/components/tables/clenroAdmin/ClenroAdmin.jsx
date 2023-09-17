import React from "react";
// Packages
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

// Firebase
import { db } from "../../../firebase";
import {
	collection,
	doc,
	onSnapshot,
	query,
	getDoc,
	where,
} from "firebase/firestore";

// Table Columns
import { ClenroColumn } from "./ClenroColumn";

// DataGrid
import DataTable from "../../DataTable/DataTable";

// Add Modal
import ShowModal from "../../modals/ShowModal";
import AddClenroAdmin from "../../forms/AddClenroAdmin";
import ResetPassword from "../../forms/ResetPassword";

// Layout
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ClenroAdmin = () => {
	const actionColumn = [
		{
			field: "action",
			headerName: "Action",
			headerClassName: "headerTheme",
			minWidth: 200,
			flex: 1,
			renderCell: (params) => {
				return (
					<>
						<div className="cellAction">
							<button
								onClick={() => {
									handleDelete(params.row.id);
								}}
								className="deleteButton"
							>
								Delete
							</button>
						</div>
					</>
				);
			},
		},
	];

	const handleDelete = async (id) => {
		const confirmation = window.confirm(
			"Are you sure you want to delete this admin?"
		);

		if (confirmation) {
			await deleteDoc(doc(db, "Admins", id))
				.then(() => {
					toast.success("Successfully deleted a CLENRO Admin");
				})
				.catch((error) => {
					toast.error(error.code, error.message);
				});
		}
	};

	const [clenroAdmin, setClenroAdmin] = useState([]);
	const q = query(collection(db, "Admins"), where("role", "==", "ClenroAdmin"));
	let unsubscribe;
	useEffect(() => {
		unsubscribe = onSnapshot(q, (querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push({ ...doc.data(), id: doc.id });
			});
			setClenroAdmin(data);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<>
			<div className="dataTable">
				<Container fluid>
					<Row className="justify-content-md-around gap-4 mb-3" md={5}>
						<ShowModal
							modalTitle="Register a CLENRO Admin"
							specifyForm={<AddClenroAdmin />}
						/>
						<ShowModal
							modalTitle="Reset a Password"
							specifyForm={<ResetPassword />}
						/>
					</Row>
				</Container>
				<DataTable
					rowData={clenroAdmin}
					columnData={ClenroColumn}
					hasOwnAction={true}
					isOwnAction={actionColumn}
				/>
			</div>
		</>
	);
};

export default ClenroAdmin;
