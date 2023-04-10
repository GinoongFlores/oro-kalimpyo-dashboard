import React from "react";

import "./home.scss";

// Components
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import UserData from "../../components/userDataTable/UserData";
import CompletedData from "../../components/completedDataTable/CompletedData";

const Home = () => {
	return (
		<div className="home">
			<Sidebar />
			<div className="homeContainer">
				<Navbar />

				<UserData />
				<div className="listContainer">
					<CompletedData />
				</div>
			</div>
		</div>
	);
};

export default Home;
