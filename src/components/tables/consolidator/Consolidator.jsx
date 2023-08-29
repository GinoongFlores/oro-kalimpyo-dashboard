// Packages
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

// Firebase
import { db } from "../../../firebase";
import { onSnapshot, doc, setDoc, collection, query } from "firebase/firestore";

// Table Columns
import { ConsolidatorColumn } from "./ConsolidatorColumn";
// import { CompletedTableSource } from "../../dataColumns/CompletedTableSource";

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
						<ViewC params={params} />
					</div>
				</>
			);
		},
	},
];

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
				<div className="text-xl py-4">Waste Consolidator</div>
				<div style={{ height: 600 }}>
					<div style={{ display: "flex", height: "100%" }}>
						<div style={{ flexGrow: 1 }}>
							<DataGrid
								rows={consolidatorData.map((user, index) => {
									return {
										...user,
										list: index + 1,
									};
								})}
								columns={ConsolidatorColumn}
								pageSize={9}
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

export default Consolidator;
