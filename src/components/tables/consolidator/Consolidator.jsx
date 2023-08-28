import "./consolidator.scss";

// Packages
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Firebase
import { db } from "../../../firebase";
import { onSnapshot, doc, setDoc, collection, query } from "firebase/firestore";

// Table Columns
import { CompletedTableSource } from "../../../dataColumns/CompletedTableSource";
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
	const [cData, setTbcData] = useState([]);
	const q = query(collection(db, "Waste Consolidator"));
	let unsubscribe;

	const getData = () => {
		unsubscribe = onSnapshot(q, (querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push({ ...doc.data(), id: doc.id });
			});
			setTbcData(data);
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
				<div className="dataTableTitle">Waste Consolidator</div>
				<div style={{ height: 600, width: "100%" }}>
					<div style={{ display: "flex", height: "100%" }}>
						<div style={{ flexGrow: 1 }}>
							<DataGrid
								rows={cData.map((user, index) => {
									return {
										...user,
										list: index + 1,
									};
								})}
								columns={CompletedTableSource}
								pageSize={9}
								rowsPerPageOptions={[9]}
								// getRowId={(row) => rows.id}
								// experimentalFeatures={{ newEditingApi: true }}
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
