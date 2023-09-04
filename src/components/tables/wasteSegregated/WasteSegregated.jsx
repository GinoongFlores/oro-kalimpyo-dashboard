import React from "react";
// Packages
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";

// Firebase
import { db } from "../../../firebase";

// Table Columns
import { WasteSegregatedColumn } from "./WasteSegregatedColumn";

const WasteSegregated = () => {
	const [wasteData, setWasteData] = useState([]);

	// Read data from firebase database
	const q = query(collection(db, "Segregated Waste"));
	let unsubscribe;
	const getData = async () => {
		unsubscribe = onSnapshot(q, (querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push({ ...doc.data(), id: doc.id });
			});
			setWasteData(data);
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
						<div className="flex-1">
							{wasteData && (
								<DataGrid
									rows={wasteData.map((user, index) => {
										return {
											...user,
											// id: index + 1,
											list: index + 1,
										};
									})}
									columns={WasteSegregatedColumn}
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
			</div>
		</>
	);
};

export default WasteSegregated;
