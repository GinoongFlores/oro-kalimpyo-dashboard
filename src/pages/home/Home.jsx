import React from "react";
import { Card } from "react-bootstrap";

import "./home.scss";

// Components
// import Sidebar from "../../components/sidebar/Sidebar";
import NavbarLink from "../../components/navbar/NavbarLink";
import UserData from "../../components/tables/users/UserData";
import Consolidator from "../../components/tables/consolidator/Consolidator";

const Home = () => {
	return (
		<div className="home flex flex-col">
			<NavbarLink />
			<div className="container mx-auto py-12">
				{/* <UserData />
				<Consolidator /> */}
				<Card className="w-80">
					<Card.Body>
						<Card.Title className="flex justify-between">
							Users
							<Card.Link
								href="#"
								className="no-underline justify-end self-end text-lg"
							>
								View Collectors
							</Card.Link>
						</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">
							Overall Users
						</Card.Subtitle>
						<Card.Text className="text-center text-xl">45 Users</Card.Text>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
};

export default Home;
