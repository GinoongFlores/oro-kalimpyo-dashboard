import React from "react";
// Components
import NavbarLink from "../../components/navbar/NavbarLink";
import HomeBody from "./HomeBody";

const Home = () => {
	return (
		<div className="flex flex-col">
			<NavbarLink />
			<div className="container mx-auto py-12">
				<HomeBody />
			</div>
		</div>
	);
};

export default Home;
