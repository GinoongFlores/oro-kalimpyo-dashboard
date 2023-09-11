// Packages
import React from "react";
import { useState, useEffect } from "react";

// Firebase
import { db } from "../../../firebase";

// Table Columns
import { userColumn } from "./UserColumn";

// DataTable
import DataTable from "../../DataTable/DataTable";

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
				<DataTable rowData={userData} columnData={userColumn} />
			</div>
		</>
	);
};

export default UserData;
