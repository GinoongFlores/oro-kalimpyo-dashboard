import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import ViewTableModal from "../modals/ViewTableModal";

const DataTable = ({ props }) => {
	const { rowData, columnData, isNeedAction, isDelete, isView } = props;
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
							{isView && <ViewTableModal />}
							{isDelete && (
								<button
									onClick={() => {
										handleDelete(params.row.id);
									}}
									className="deleteButton"
								>
									Delete
								</button>
							)}
						</div>
					</>
				);
			},
		},
	];

	const handleDelete = async (id) => {
		const confirmation = window.confirm(
			"Are you sure you want to delete this admin?"
		);

		if (confirmation) {
			await deleteDoc(doc(db, "Admins", id))
				.then(() => {
					console.log("Document successfully deleted!");
				})
				.catch((error) => {
					console.error("Error removing document: ", error);
				});
		}
	};

	return (
		<div style={{ height: 600, width: "100%" }}>
			<div style={{ display: "flex", height: "100%" }}>
				<div style={{ flexGrow: 1 }}>
					<DataGrid
						rows={rowData.map((user, index) => {
							return {
								...user,
								list: index + 1,
							};
						})}
						columns={
							isNeedAction ? columnData.concat(actionColumn) : columnData
						}
						pageSize={9}
						density="comfortable"
						rowsPerPageOptions={[9]}
						getRowId={(row) => row.id}
						components={{ Toolbar: GridToolbar }}
					/>
				</div>
			</div>
		</div>
	);
};

export default DataTable;
