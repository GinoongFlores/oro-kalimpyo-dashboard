// Packages
import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

// Firebase
import { db } from "../../../firebase";

// Firebase auth
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

// Table Columns
import { userColumn } from "./UserColumn";

import { collection, onSnapshot, query } from "firebase/firestore";

const UserData = () => {
	const [userData, setUserData] = useState([]);

	const actionColumn = [
		{
			field: "action",
			headerName: "Action",
			headerClassName: "headerTheme",
			width: 200,
			renderCell: (params) => {
				return (
					<>
						<div className="cellAction">
							{/* <ViewUser params={params} /> */}
						</div>
					</>
				);
			},
		},
	];

	// Read data from firebase database
	const q = query(collection(db, "Waste Generator"));
	let unsubscribe;
	const getData = async () => {
		unsubscribe = onSnapshot(q, (querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push({ ...doc.data(), id: doc.id });
			});
			setUserData(data);
		});
	};

	useEffect(() => {
		getData();
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<>
			<div className="dataTable">
				<div style={{ height: 600, width: "100%" }}>
					<div style={{ display: "flex", height: "100%" }}>
						{userData && (
							<DataGrid
								rows={userData.map((user, index) => {
									return {
										...user,
										list: index + 1,
										establishment_type:
											user.establishment_type || "Non-Establishment",
									};
								})}
								columns={userColumn}
								pageSize={9}
								density="comfortable"
								rowsPerPageOptions={[9]}
								getRowId={(row) => row.id}
								components={{ Toolbar: GridToolbar }}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default UserData;
