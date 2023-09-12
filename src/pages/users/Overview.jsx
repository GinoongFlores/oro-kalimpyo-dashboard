import React from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

// Cards
import DbCards from "../../components/cards/db/DbCards";

const Overview = () => {
	return (
		<>
			<Container>
				<DbCards
					showGenerator={true}
					showWasteContribution={true}
					needLink={false}
				/>
			</Container>
		</>
	);
};

export default Overview;
