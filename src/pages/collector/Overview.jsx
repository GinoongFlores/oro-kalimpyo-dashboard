import React from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

// Cards
import DbCards from "../../components/cards/db/DbCards";

import DbSortedCards from "../../components/cards/db/DbSortedCards";

const Overview = () => {
	return (
		<>
			<Container fluid>
				<Row className={"justify-content-sm-evenly align-content-sm-center"}>
					<DbCards
						showCollector={true}
						showWasteContribution={true}
						needLink={false}
					/>
					<DbSortedCards showUnCollected={true} />
				</Row>
			</Container>
		</>
	);
};

export default Overview;
