import React from "react";
import { useState, useEffect } from "react";
import {
	PieChart,
	Pie,
	Tooltip,
	ResponsiveContainer,
	Cell,
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	BarChart,
	Bar,
} from "recharts";

// Firebase
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Statistics = () => {
	const [userNum, setUserNum] = useState(0);
	const [consolidatorNum, setConsolidatorNum] = useState(0);
	const [collectorNum, setCollectorNum] = useState(0);
	const [wasteContributionNum, setWasteContributionNum] = useState(0);
	const [wasteSegregatedNum, setWasteSegregatedNum] = useState(0);

	const pieChart = [
		{ name: "Waste Generators", value: userNum },
		{ name: "Waste Collectors", value: collectorNum },
		{ name: "Waste Consolidators", value: consolidatorNum },
		{ name: "Waste Contribution", value: wasteContributionNum },
		{ name: "Waste Segregated", value: wasteSegregatedNum },
	];

	const areaChart = [
		{
			name: "Start",
			uv: 0,
			pv: 0,
			amt: 0,
		},
		{
			name: "Waste Generators",
			uv: userNum,
			pv: userNum,
			amt: userNum,
		},
		{
			name: "Waste Collectors",
			uv: collectorNum,
			pv: collectorNum,
			amt: collectorNum,
		},
		{
			name: "Waste Consolidators",
			uv: consolidatorNum,
			pv: consolidatorNum,
			amt: consolidatorNum,
		},
		{
			name: "Waste Contribution",
			uv: wasteContributionNum,
			pv: wasteContributionNum,
			amt: wasteContributionNum,
		},
		{
			name: "Waste Segregated",
			uv: wasteSegregatedNum,
			pv: wasteSegregatedNum,
			amt: wasteSegregatedNum,
		},
	];

	const barChart = [
		{
			name: "Waste Generators",
			uv: userNum,
			pv: userNum,
			amt: userNum,
		},
		{
			name: "Waste Collectors",
			uv: collectorNum,
			pv: collectorNum,
			amt: collectorNum,
		},
		{
			name: "Waste Contribution",
			uv: wasteContributionNum,
			pv: wasteContributionNum,
			amt: wasteContributionNum,
		},
		{
			name: "Waste Consolidators",
			uv: consolidatorNum,
			pv: consolidatorNum,
			amt: consolidatorNum,
		},
		{
			name: "Waste Segregated",
			uv: wasteSegregatedNum,
			pv: wasteSegregatedNum,
			amt: wasteSegregatedNum,
		},
	];

	const COLORS = [
		"#0088FE",
		"#00C49F",
		"#FFBB28",
		"#FF8042",
		"#AF19FF",
		"#FF1919",
		"#19FFB3",
		"#FF19E6",
		"#19B3FF",
		"#FFC219",
	];

	// Pie Chart Customized Label
	const RADIAN = Math.PI / 180;
	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
		index,
	}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);
		return (
			<text
				x={x}
				y={y}
				fill="white"
				textAnchor={x > cx ? "start" : "end"}
				dominantBaseline="central"
			>
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};

	// Bar chart and triangle bar
	const getPath = (x, y, width, height) => {
		return `M${x},${y + height}C${x + width / 3},${y + height} ${
			x + width / 2
		},${y + height / 3}
		${x + width / 2}, ${y}
		C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
			x + width
		}, ${y + height}
		Z`;
	};

	const TriangleBar = (props) => {
		const { fill, x, y, width, height } = props;
		return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
	};

	const getData = () => {
		const collections = [
			"Waste Generator",
			"Waste Collector",
			"Waste Consolidator",
			"Waste Contribution",
			"Waste Segregated",
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
				setWasteSegregatedNum(counts["Waste Segregated"]);
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
	});

	return (
		<>
			<Container>
				<Row
					className={"justify-content-md-evenly align-content-sm-center py-12"}
				>
					<Col md={4}>
						{/* Pie Chart */}
						<h2 className="font-light pl-5 text-2xl text-center">Pie Chart</h2>
						<ResponsiveContainer width="100%" height={300}>
							<PieChart width={500} height={400}>
								<Pie
									dataKey="value"
									isAnimationActive={true}
									data={pieChart}
									outerRadius={130}
									fill={"#00C49F"}
									label={renderCustomizedLabel}
									labelLine={false}
								>
									{pieChart.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</Col>
					<Col md={8}>
						{/* Area Chart */}
						<h2 className="font-light pl-10 text-2xl text-center">
							Area Chart
						</h2>
						<ResponsiveContainer width="100%" height={300}>
							<AreaChart
								width={500}
								height={400}
								dataKey="value"
								isAnimationActive={true}
								data={areaChart}
								margin={{
									top: 10,
									right: 30,
									left: 0,
									bottom: 0,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Area
									type="monotone"
									dataKey="uv"
									stackId="1"
									stroke="#8884d8"
									fill="#8884d8"
								/>
								<Area
									type="monotone"
									dataKey="pv"
									stackId="1"
									stroke="#82ca9d"
									fill="#82ca9d"
								/>
								<Area
									type="monotone"
									dataKey="amt"
									stackId="1"
									stroke="#ffc658"
									fill="#ffc658"
								/>
							</AreaChart>
						</ResponsiveContainer>
					</Col>
				</Row>
				<hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
				{/* Bar Chart */}
				<Row>
					<Col md={12}>
						<h2 className="font-light pl-5 text-2xl text-center">Bar Chart</h2>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart
								width={500}
								height={300}
								data={barChart}
								margin={{
									top: 20,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Bar
									dataKey="uv"
									fill="#8884d8"
									shape={<TriangleBar />}
									label={{ position: "top" }}
								>
									{barChart.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
									))}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Statistics;
