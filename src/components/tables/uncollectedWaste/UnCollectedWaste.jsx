import React from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

// Firebase
import { db } from "../../../firebase";

// Firebase auth
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

// Table Columns
import { UncollectedColumn } from "./UnCollectedColumn"

import {
	collection,
	onSnapshot,
	query,
	doc,
	getDocs,
	getDoc,
	where,
} from "firebase/firestore";
import useFetch from "../../../hooks/useFetch";

const UnCollectedWaste = () => {
	const [data, setData] = useState([]);

	// Read data from firebase database
	const ref = collection(db, "Waste Contribution");

	const q = query(ref, where("waste_type", "==", "Unsegregated"));

	let unsubscribe;
	const getData = async () => {
		unsubscribe = onSnapshot(q, (querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push({ ...doc.data(), id: doc.id });
			});
			setData(data);
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
				<div className="text-xl py-6">Inappropriate Waste</div>
				<div style={{ height: 600, width: "100%" }}>
					<div style={{ display: "flex", height: "100%" }}>
						]							<DataGrid
							rows={data?.map((user, index) => {
								return {
									...user,
									// id: index + 1,
									list: index + 1,
								};
							})}
							columns={UncollectedColumn}
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

export default UnCollectedWaste;
