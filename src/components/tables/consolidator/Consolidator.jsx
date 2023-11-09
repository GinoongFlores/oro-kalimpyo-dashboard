// Packages
import { useState, useEffect } from "react";

// Firebase
import { db } from "../../../firebase";
import { onSnapshot, doc, setDoc, collection, query } from "firebase/firestore";

// Layout
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Table Columns
import { ConsolidatorColumn } from "./ConsolidatorColumn";

// DataTable
import DataTable from "../../DataTable/DataTable";

// Modals
import ShowModal from "../../modals/ShowModal";

// Forms
import AddConsolidator from "../../forms/AddConsolidator";

const Consolidator = () => {
	const [consolidatorData, setConsolidatorData] = useState([]);
	const q = query(collection(db, "Waste Consolidators"));
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
				<Container fluid>
					<Row className="justify-content-md-around gap-4 mb-3" md={5}>
						<ShowModal
							modalTitle="Add Consolidator"
							specifyForm={<AddConsolidator />}
						/>
					</Row>
				</Container>
				<DataTable rowData={consolidatorData} columnData={ConsolidatorColumn} />
			</div>
		</>
	);
};

export default Consolidator;
