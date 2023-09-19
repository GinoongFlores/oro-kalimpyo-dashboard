import React from "react";
// Components
import NavbarLink from "../../components/navbar/NavbarLink";
import DbCards from "../../components/cards/db/DbCards";
import Container from "react-bootstrap/Container";

import Row from "react-bootstrap/Row";

import Statistics from "./Statistics";

const Home = () => {
	const { currentUser } = useAuth();
	return (
		<>
			<NavbarLink />
			<Container fluid className="p-0">
				<div className="py-12 pb-0">
					<Container>
						<Row>
							<DbCards
								showGenerator={true}
								showConsolidator={true}
								showCollector={true}
								needLink={true}
							/>
						</Row>
					</Container>
				</div>
				<div className="b-example-divider"></div>
				<Statistics />
			</Container>
		</>
	);
};

export default Home;
