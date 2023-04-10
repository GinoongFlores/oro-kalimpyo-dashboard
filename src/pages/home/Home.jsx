import React from "react";

import "./home.scss";

// Components
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import UserData from "../../components/userDataTable/UserData";
import { TbcData } from "../../components/tbcDataTable/TbcData";

const Home = () => {
	return (
		<div className="home">
			<Sidebar />
			<div className="homeContainer">
				<Navbar />
				<TbcData />
				<div className="listContainer">
					<h2 className="listTitle">Nazareth Users</h2>
					<UserData />
				</div>
			</div>
		</div>
	);
};

export default Home;
