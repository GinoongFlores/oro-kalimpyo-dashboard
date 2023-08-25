import "./tbcData.scss";

// Packages
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Firebase
import { db } from "../../firebase";
import { collection, doc, onSnapshot, query, getDoc } from "firebase/firestore";

// Table Columns
import { TbcTableSource } from "../../dataColumns/TbcTableSource";

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
					<div className="cellAction">
						<ViewTBC params={params} />
					</div>
				</>
			);
		},
	},
];

export const TbcData = () => {
	const [tbcData, setTbcData] = useState([]);
	const q = query(collection(db, "Waste Collector"));
	let unsubscribe;
	useEffect(() => {
		unsubscribe = onSnapshot(q, (querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push({ ...doc.data(), id: doc.id });
			});
			setTbcData(data);
		});
		return () => {
			unsubscribe(); // return to prevent memory leak
		};
	}, []);

	// console.log(tbcData);

	return (
		<>
			<div className="dataTable">
				<div className="dataTableTitle">Waste Collector</div>
				<div style={{ height: 600, width: "100%" }}>
					<div style={{ display: "flex", height: "100%" }}>
						<div style={{ flexGrow: 1 }}>
							<DataGrid
								rows={tbcData.map((user, index) => {
									return {
										...user,
										list: index + 1,
									};
								})}
								columns={TbcTableSource}
								pageSize={9}
								rowsPerPageOptions={[9]}
								getRowId={(row) => row.id}
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
