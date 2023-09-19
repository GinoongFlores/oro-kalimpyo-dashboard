// Packages
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

// Firebase
import { db } from "../../../firebase";
import { collection, doc, onSnapshot, query, getDoc } from "firebase/firestore";

// Table Columns
import { CollectorColumn } from "./CollectorColumn";

import DataTable from "../../DataTable/DataTable";

// Modals
// import ViewTBC from "../modals/viewTBC/ViewTBC";

const actionColumn = [
	{
		field: "action",
		headerName: "Action",
		headerClassName: "headerTheme",
		minWidth: 200,
		flex: 1,
		renderCell: (params) => {
			return (
				<>
					<div className="cellAction">
						<button
							onClick={() => {
								handleDelete(params.row.id);
							}}
							className="deleteButton"
						>
							Delete
						</button>
					</div>
				</>
			);
		},
	},
];

const Collector = () => {
	const [collectorsData, setCollectorsData] = useState([]);
	const q = query(collection(db, "Waste Collector"));
	let unsubscribe;
	useEffect(() => {
		unsubscribe = onSnapshot(q, (querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push({ ...doc.data(), id: doc.id });
			});
			setCollectorsData(data);
		});
		return () => {
			unsubscribe(); // return to prevent memory leak
		};
	}, []);

	return (
		<>
			<div className="dataTable">
				<DataTable rowData={collectorsData} columnData={CollectorColumn} />
			</div>
		</>
	);
};

export default Collector;
