import React from "react";
import { useState, useEffect } from "react";

// Firebase
import { db } from "../../../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

// Table Columns
import { WasteSegregatedColumn } from "./WasteSegregatedColumn";

// DataTable
import DataTable from "../../DataTable/DataTable";

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
				<DataTable rowData={wasteData} columnData={WasteSegregatedColumn} />
			</div>
		</>
	);
};

export default WasteSegregated;
