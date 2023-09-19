// Packages
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

// Firebase
import { db } from "../../../firebase";
import { onSnapshot, doc, setDoc, collection, query } from "firebase/firestore";

// Table Columns
import { ConsolidatorColumn } from "./ConsolidatorColumn";
// import { CompletedTableSource } from "../../dataColumns/CompletedTableSource";

// DataTable
import DataTable from "../../DataTable/DataTable";

const Consolidator = () => {
	const [consolidatorData, setConsolidatorData] = useState([]);
	const q = query(collection(db, "Waste Consolidator"));
	let unsubscribe;

	const getData = () => {
		unsubscribe = onSnapshot(q, (querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push({ ...doc.data(), id: doc.id });
			});
			setConsolidatorData(data);
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
				<DataTable rowData={consolidatorData} columnData={ConsolidatorColumn} />
			</div>
		</>
	);
};

export default Consolidator;
