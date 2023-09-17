// Packages
import React from "react";
import { useState, useEffect } from "react";

// Firebase
import { db } from "../../../firebase";

// Table Columns
import { userColumn } from "./UserColumn";

// DataTable
import DataTable from "../../DataTable/DataTable";
import Button from "react-bootstrap/Button";

import {
	collection,
	onSnapshot,
	query,
	updateDoc,
	getDocs,
} from "firebase/firestore";

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

	const handleResetContribution = async () => {
		const WasteGeneratorRef = collection(db, "Waste Generator");
		const querySnapshot = await getDocs(WasteGeneratorRef);
		const confirmation = window.confirm(
			"Are you sure you want to reset all the daily contribution?"
		);
		if (confirmation) {
			querySnapshot.forEach(async (doc) => {
				await updateDoc(doc.ref, {
					contributed_today: "No",
				});
			});
		}
	};

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
				<div className="mb-3 flex justify-center">
					<Button onClick={handleResetContribution} variant="success">
						Reset Daily Contribution
					</Button>
				</div>
				<DataTable rowData={userData} columnData={userColumn} />
			</div>
		</>
	);
};

export default UserData;
