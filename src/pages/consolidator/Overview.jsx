import React from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

// Cards
import DbCards from "../../components/cards/db/DbCards";

const Overview = () => {
	return (
		<>
			<Container fluid>
				<Row className={"justify-content-sm-evenly align-content-sm-center"}>
					<DbCards
						showConsolidator={true}
						showWasteSegregated={true}
						needLink={false}
					/>
				</Row>
			</Container>
		</>
	);
};

export default Overview;
