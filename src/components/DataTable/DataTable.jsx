import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const DataTable = ({ rowData, columnData, hasOwnAction, isOwnAction }) => {
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
						columns={hasOwnAction ? columnData.concat(isOwnAction) : columnData}
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
