import React from "react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getCountFromServer } from "firebase/firestore";

// Components
// import Sidebar from "../../components/sidebar/Sidebar";
import Cards from "./Cards";

const HomeBody = () => {
	const [userNum, setUserNum] = useState(0);
	const [collectorNum, setCollectorNum] = useState(0);
	const [consolidatorNum, setConsolidatorNum] = useState(0);
	const cardData = [
		{
			title: "Users",
			description: "Overall Users",
			value: userNum,
			buttonLink: "View Users",
			Link: "/users",
		},
		{
			title: "Collectors",
			description: "Overall Collectors",
			value: collectorNum,
			buttonLink: "View Collectors",
			Link: "/collectors",
		},
		{
			title: "Consolidators",
			description: "Overall Consolidators",
			value: consolidatorNum,
			buttonLink: "View Consolidators",
			Link: "/consolidators",
		},
	];
	const getData = async () => {
		const collections = [
			"Waste Generator",
			"Waste Collector",
			"Waste Consolidator",
		];
		const counts = {};
		for (const collectionName of collections) {
			const coll = collection(db, collectionName);
			const snapshot = await getCountFromServer(coll);
			counts[collectionName] = snapshot.data().count;
		}
		setUserNum(counts["Waste Generator"]);
		setCollectorNum(counts["Waste Collector"]);
		setConsolidatorNum(counts["Waste Consolidator"]);
	};
	useEffect(() => {
		getData();
	}, []);

	const cardItems = cardData.map((item, index) => {
		return <Cards item={item} key={index} />;
	});

	return (
		<>
			<div className="flex flex-col md:grid md:grid-cols-3 gap-4 my-4">
				{cardItems}
			</div>
		</>
	);
};

export default HomeBody;
