// Packages
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

// Firebase
import { db } from "../../../firebase";
import { collection, doc, onSnapshot, query, getDoc } from "firebase/firestore";

// Table Columns
import { CollectorColumn } from "./CollectorColumn";

import DataTable from "../../DataTable/DataTable";

// Layout
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Modals
import AddCollector from "../../forms/AddCollector";
import ShowModal from "../../modals/ShowModal";

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
				<Container fluid>
					<Row className="justify-content-md-around gap-4 mb-3" md={5}>
						<ShowModal
							modalTitle="Add Collector"
							specifyForm={<AddCollector />}
						/>
					</Row>
				</Container>

				<DataTable rowData={collectorsData} columnData={CollectorColumn} />
			</div>
		</>
	);
};

export default Collector;
