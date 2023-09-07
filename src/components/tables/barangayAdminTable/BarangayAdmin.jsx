// Packages
import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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

const BarangayAdmin = () => {
	const [barangayAdmin, setBarangayAdmin] = useState([]);

	const q = query(
		collection(db, "Admins"),
		where("role", "==", "BarangayAdmin")
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

	const actionColumn = [
		{
			field: "action",
			headerName: "Action",
			headerClassName: "headerTheme",
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<div className="cellAction">
							{/* <EditUser params={params} />
							<button
								onClick={() => handleDelete(params.row.id)}
								className="deleteButton"
							>
								Delete
							</button> */}
						</div>
					</>
				);
			},
		},
	];

	return (
		<>
			<div className="dataTable">
				<div className="mb-4 flex justify-center">
					<ShowModal
						modalTitle="Register a Barangay Admin"
						specifyForm={<AddBarangayAdmin />}
					/>
				</div>
				<div style={{ display: "flex", height: "100%" }}>
					<div style={{ height: 600, width: "100%" }}>
						<DataGrid
							rows={barangayAdmin.map((user, index) => {
								return {
									...user,
									list: index + 1,
								};
							})}
							columns={BarangayColumn}
							pageSize={9}
							density="comfortable"
							rowsPerPageOptions={[9]}
							getRowId={(row) => row.id}
							components={{ Toolbar: GridToolbar }}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default BarangayAdmin;
