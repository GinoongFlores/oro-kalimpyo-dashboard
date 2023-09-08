import React from "react";
// Components
import NavbarLink from "../../components/navbar/NavbarLink";
import HomeBody from "./HomeBody";

const Home = () => {
	return (
		<>
			<NavbarLink />
			<div className="py-12">
				<HomeBody />
			</div>
		</>
	);
};

export default Home;
