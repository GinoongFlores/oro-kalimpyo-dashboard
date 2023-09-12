import React from "react";
// Components
import NavbarLink from "../../components/navbar/NavbarLink";
import HomeBody from "./HomeBody";
import DbCards from "../../components/cards/db/DbCards";

const Home = () => {
	return (
		<>
			<NavbarLink />
			<div className="py-12">
				{/* <HomeBody /> */}
				<DbCards
					showGenerator={true}
					showConsolidator={true}
					showCollector={true}
					needLink={true}
				/>
			</div>
		</>
	);
};

export default Home;
