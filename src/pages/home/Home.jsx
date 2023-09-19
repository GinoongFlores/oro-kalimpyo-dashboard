import React from "react";
// Components
import NavbarLink from "../../components/navbar/NavbarLink";
import HomeBody from "./HomeBody";
import UserAuthContext, { useAuth } from "../../context/UserAuthContext";

const Home = () => {
	const { currentUser } = useAuth();
	return (
		<div className="flex flex-col">
			<NavbarLink />
			<h5>{currentUser?.email}</h5>

			<div className="container mx-auto py-12">
				<HomeBody />
			</div>
		</div>
	);
};

export default Home;
