// Packages
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

// Firebase
import { db } from "../../../firebase";
import { collection, doc, onSnapshot, query, getDoc } from "firebase/firestore";

// Table Columns
import { CollectorColumn } from "./CollectorColumn";

// Modals
// import ViewTBC from "../modals/viewTBC/ViewTBC";

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
						<ViewTBC params={params} />
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
				<div className="text-xl py-4 mt-2">Waste Collector</div>
				<div style={{ height: 600, width: "100%" }}>
					<div style={{ display: "flex", height: "100%" }}>
						<div style={{ flexGrow: 1 }}>
							<DataGrid
								rows={collectorsData.map((user, index) => {
									return {
										...user,
										list: index + 1,
									};
								})}
								columns={CollectorColumn}
								pageSize={9}
								density="comfortable"
								rowsPerPageOptions={[9]}
								getRowId={(row) => row.id}
								components={{ Toolbar: GridToolbar }}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Collector;