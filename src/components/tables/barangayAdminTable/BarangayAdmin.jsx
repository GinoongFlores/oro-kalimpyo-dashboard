// Packages
import React from "react";
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
import { BarangayColumn } from "./BarangayColumn";

// Modals and Pages
import ShowModal from "../../modals/ShowModal";
import AddBarangayAdmin from "../../forms/AddBarangayAdmin";

import DataTable from "../../DataTable/DataTable";

const BarangayAdmin = () => {
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
			await deleteDoc(doc(db, "Admin", id))
				.then(() => {
					toast.success("Successfully deleted a barangay admin");
				})
				.catch((error) => {
					toast.error(error.code, error.message);
				});
		}
	};

	const [barangayAdmin, setBarangayAdmin] = useState([]);
	const q = query(
		collection(db, "Admin"),
		where("role", "==", "Barangay Admin")
	);

	let unsubscribe;
	useEffect(() => {
		unsubscribe = onSnapshot(q, (querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push({ ...doc.data(), id: doc.id });
			});
			setBarangayAdmin(data);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<>
			<div className="dataTable">
				<div className="mb-4 flex justify-center">
					<ShowModal
						modalTitle="Register a Barangay Admin"
						specifyForm={<AddBarangayAdmin />}
					/>
				</div>
				<DataTable
					rowData={barangayAdmin}
					columnData={BarangayColumn}
					hasOwnAction={true}
					isOwnAction={actionColumn}
				/>
			</div>
		</>
	);
};

export default BarangayAdmin;
