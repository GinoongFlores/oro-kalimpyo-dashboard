import React from "react";
// Packages
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
import { ClenroColumn } from "./ClenroColumn";

// Add Modal
import ShowModal from "../../modals/ShowModal";
import AddClenroAdmin from "../../forms/AddClenroAdmin";
import ResetPassword from "../../forms/ResetPassword";

const ClenroAdmin = () => {
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
				<div className="mb-4 flex justify-around items-center gap-2">
					<ShowModal
						modalTitle="Register a CLENRO Admin"
						specifyForm={<AddClenroAdmin />}
					/>
					<ShowModal
						modalTitle="Reset an Email"
						specifyForm={<ResetPassword />}
					/>
				</div>
				<div style={{ height: 600, width: "100%" }}>
					<div style={{ display: "flex", height: "100%" }}>
						<div style={{ flexGrow: 1 }}>
							<DataGrid
								rows={clenroAdmin.map((user, index) => {
									return {
										...user,
										list: index + 1,
									};
								})}
								columns={ClenroColumn}
								pageSize={9}
								density="comfortable"
								rowsPerPageOptions={[9]}
								getRowId={(row) => row.id}
								components={{ Toolbar: GridToolbar }}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ClenroAdmin;
