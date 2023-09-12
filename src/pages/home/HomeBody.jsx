import React from "react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

// Components
// import Sidebar from "../../components/sidebar/Sidebar";
import Cards from "../../components/cards/Cards";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

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

	const getData = () => {
		const collections = [
			"Waste Generator",
			"Waste Collector",
			"Waste Consolidator",
		];
		const counts = {};
		const unsubscribes = []; // unsubscribe function
		for (const collectionName of collections) {
			const q = query(collection(db, collectionName));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				counts[collectionName] = querySnapshot.size;
				setUserNum(counts["Waste Generator"]);
				setCollectorNum(counts["Waste Collector"]);
				setConsolidatorNum(counts["Waste Consolidator"]);
			});
			unsubscribes.push(unsubscribe);
		}
		return unsubscribes;
	};

	useEffect(() => {
		const unsubscribesPromise = Promise.resolve(getData());
		return () => {
			unsubscribesPromise.then((unsubscribes) => {
				unsubscribes.forEach((unsubscribe) => unsubscribe()); // unsubscribe to all listeners
			});
		};
	}, []);

	const cardItems = cardData.map((item, index) => {
		return <Cards item={item} key={index} />;
	});

	return (
		<>
			<Container fluid="md">
				<Row className="justify-content-sm-center align-content-sm-center">
					{cardItems}
				</Row>
			</Container>
		</>
	);
};

export default HomeBody;
