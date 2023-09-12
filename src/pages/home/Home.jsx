import React from "react";
// Components
import NavbarLink from "../../components/navbar/NavbarLink";
import DbCards from "../../components/cards/db/DbCards";

const Home = () => {
	return (
		<>
			<NavbarLink />
			<div className="py-12">
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
