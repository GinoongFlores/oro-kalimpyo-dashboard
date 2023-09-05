// Packages
import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

// Firebase
import { db } from "../../../firebase";

// Table Columns
import { BarangayColumn } from "./BarangayColumn";

// Modals and Pages

const BarangayAdmin = () => {
	const [userData, setUserData] = useState([]);

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

	// Read data from firebase database
	// const getData = () => {
	// 	const usersRef = ref(db, "/BarangayAdmin/");
	// 	const readData = onValue(usersRef, (snapshot) => {
	// 		const data = snapshot.val();
	// 		setUserData(Object.values(data));
	// 	});
	// };
	// useEffect(() => {
	// 	getData();
	// }, []);

	return (
		<>
			<div className="dataTable">
				<div style={{ display: "flex", height: "100%" }}>
					<div style={{ height: 600, width: "100%" }}>
						{userData && (
							<DataGrid
								rows={userData.map((user, index) => {
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
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default BarangayAdmin;
