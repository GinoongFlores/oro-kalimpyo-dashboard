// Packages
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";

// Firebase
import { db } from "../../../firebase";

import HomeBody from "../../../pages/home/HomeBody";

// Table Columns
import { contributionColumn } from "./ContributionColumn";
import useFetch from "../../../hooks/useFetch";

const WasteContribution = () => {
	const { data } = useFetch("Waste Contribution");

	// console.log(data)
	return (
		<>
			<div className="dataTable">
				{/* <div className="text-xl py-2">Waste Contributions</div> */}
				<div style={{ height: 600, width: "100%" }}>
					<div style={{ display: "flex", height: "100%" }}>
						<DataGrid
							rows={data?.map((user, index) => {
								return {
									...user,
									// id: index + 1,
									list: index + 1,
								};
							})}
							columns={contributionColumn}
							pageSize={9}
							density="comfortable"
							rowsPerPageOptions={[9]}
							getRowId={(row) => row.id}
							components={{ Toolbar: GridToolbar }}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default WasteContribution;
