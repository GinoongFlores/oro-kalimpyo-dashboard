import "./completedData.scss";

// Packages
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Firebase
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";

// Table Columns
import { CompletedTableSource } from "../../dataColumns/CompletedTableSource";
// import { CompletedTableSource } from "../../dataColumns/CompletedTableSource";

// Modals
import ViewTBC from "../modals/viewTBC/ViewTBC";

const actionColumn = [
	{
		field: "action",
		headerName: "Action",
		headerClassName: "headerTheme",
		width: 150,
		renderCell: (params) => {
			return (
				<>
					<div className="cellAction">{/* <ViewTBC params={params} /> */}</div>
				</>
			);
		},
	},
];

const CompletedData = () => {
	const [cData, setTbcData] = useState([]);

	useEffect(() => {
		const tbcRef = ref(db, "/Nazareth_C_Contributions/");
		const readData = onValue(tbcRef, (snapshot) => {
			const data = snapshot.val();
			setTbcData(Object.values(data));
		});
		return () => {
			readData(); // return to prevent memory leak
		};
	}, []);

	return (
		<>
			<div className="dataTable">
				<div className="dataTableTitle">Completed Contributions</div>
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
								columns={CompletedTableSource.concat(actionColumn)}
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

export default CompletedData;
