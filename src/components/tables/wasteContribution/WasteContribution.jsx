import React from "react";
// Packages
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";

// Firebase
import { db } from "../../../firebase";

// Table Columns
import { contributionColumn } from "./ContributionColumn";

const WasteContribution = () => {
	const [userData, setUserData] = useState([]);

	// Read data from firebase database
	const q = query(collection(db, "Waste Contribution"));
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
				<div className="text-xl py-6">Waste Contributions</div>
				<div style={{ height: 600, width: "100%" }}>
					<div style={{ display: "flex", height: "100%" }}>
						{userData && (
							<DataGrid
								rows={userData.map((user, index) => {
									return {
										...user,
										// id: index + 1,
										list: index + 1,
									};
								})}
								columns={contributionColumn}
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

export default WasteContribution;
