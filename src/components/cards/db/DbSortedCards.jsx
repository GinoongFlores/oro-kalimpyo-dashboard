import React from "react";
import { useState, useEffect } from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

// Card template
import Cards from "../Cards";

// Firebase
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

const DbSortedCards = ({
	showYesContribution,
	showNoContribution,
	showUnsegregated,
	showUnCollected,
}) => {
	const [yesContribution, setYesContribution] = useState(0);
	const [noContribution, setNoContribution] = useState(0);
	const [unsegregated, setUnsegregated] = useState(0);
	const [uncollected, setUncollected] = useState(0);

	const cardData = [
		{
			title: "Contributed Today",
			description: "Overall Users who contributed today",
			buttonLink: "View Users",
			value: yesContribution,
			show: showYesContribution,
		},
		{
			title: "Not Contributed Today",
			description: "Overall No Contribution Today",
			value: noContribution,
			show: showNoContribution,
		},
		{
			title: "Unsegregated Waste",
			description: "Overall Unsegregated Waste",
			value: unsegregated,
			show: showUnsegregated,
		},
		{
			title: "Uncollected Waste",
			description: "Overall Uncollected Waste",
			value: uncollected,
			show: showUnCollected,
		},
	];

	const q0 = query(
		collection(db, "Waste Generator"),
		where("contributed_today", "==", "No")
	);
	const q1 = query(
		collection(db, "Waste Generator"),
		where("contributed_today", "==", "Yes")
	);
	const q2 = query(
		collection(db, "Waste Contribution"),
		where("status", "==", "Unsegregated")
	);
	useEffect(() => {
		let unsubscribe0;
		let unsubscribe1;
		let unsubscribe2;

		unsubscribe0 = onSnapshot(q0, (querySnapshot) => {
			setNoContribution(querySnapshot.size);
		});
		unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
			setYesContribution(querySnapshot.size);
		});
		unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
			setUncollected(querySnapshot.size);
		});
		return () => {
			unsubscribe0();
			unsubscribe1();
			unsubscribe2();
		};
	}, []);

	const cardItems = cardData
		.filter((item) => item.show)
		.map((item, index) => {
			return <Cards key={index} item={item} />;
		});

	return <>{cardItems}</>;
};

export default DbSortedCards;
