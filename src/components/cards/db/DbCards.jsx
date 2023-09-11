import React from "react";
import { useState, useEffect } from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

// Card template
import Cards from "../Cards";

// Firebase
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase";

const DbCards = ({
	showGenerator,
	showCollector,
	showConsolidator,
	showWasteContribution,
	needLink,
}) => {
	const [userNum, setUserNum] = useState(0);
	const [consolidatorNum, setConsolidatorNum] = useState(0);
	const [collectorNum, setCollectorNum] = useState(0);
	const [wasteContributionNum, setWasteContributionNum] = useState(0);

	const getData = () => {
		const collections = [
			"Waste Generator",
			"Waste Collector",
			"Waste Consolidator",
			"Waste Contribution",
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
				setWasteContributionNum(counts["Waste Contribution"]);
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

	const cardData = [
		{
			title: "Waste Generators",
			description: "Overall Users",
			value: userNum,
			buttonLink: "View Users",
			Link: "/users",
			show: showGenerator,
			hasLink: needLink,
		},

		{
			title: "Waste Collectors",
			description: "Overall Collectors",
			value: collectorNum,
			buttonLink: "View Collectors",
			Link: "/collectors",
			show: showCollector,
			hasLink: needLink,
		},

		{
			title: "Waste Consolidators",
			description: "Overall Consolidators",
			value: consolidatorNum,
			buttonLink: "View Consolidators",
			Link: "/consolidators",
			show: showConsolidator,
			hasLink: needLink,
		},

		{
			title: "Waste Contribution",
			description: "Overall Waste Contribution",
			value: wasteContributionNum,
			show: showWasteContribution,
		},
	];

	const cardItems = cardData
		.filter((item) => item.show)
		.map((item, index) => {
			return <Cards key={index} item={item} needLink={needLink} />;
		});

	return (
		<>
			<Container>
				<Row className={"justify-content-sm-evenly align-content-sm-center"}>
					{cardItems}
				</Row>
			</Container>
		</>
	);
};

export default DbCards;
