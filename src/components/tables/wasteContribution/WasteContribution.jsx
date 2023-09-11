// Packages
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

// Firebase
import { db } from "../../../firebase";

// Table Columns
import { contributionColumn } from "./ContributionColumn";
import useFetch from "../../../hooks/useFetch";

// DataTable
import DataTable from "../../DataTable/DataTable";

const WasteContribution = () => {
	// Read overall waste contribution
	const { data } = useFetch("Waste Contribution");

	// Read Uncollected Waste
	const [unCollectedData, setUnCollectedData] = useState([]);
	const ref = collection(db, "Waste Contribution");
	const q = query(ref, where("waste_type", "==", "Unsegregated"));
	let unsubscribe;
	const getData = async () => {
		unsubscribe = onSnapshot(q, (querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push({ ...doc.data(), id: doc.id });
			});
			setUnCollectedData(data);
		});
	};
	useEffect(() => {
		getData();
		return () => {
			unsubscribe();
		};
	}, []);

	// console.log(data);
	return (
		<>
			<div className="dataTable">
				<DataTable rowData={data} columnData={contributionColumn} />
			</div>
			<div className="dataTable pt-4">
				<h3 className="font-extralight">Uncollected Waste</h3>
				<DataTable rowData={unCollectedData} columnData={contributionColumn} />
			</div>
		</>
	);
};

export default WasteContribution;
