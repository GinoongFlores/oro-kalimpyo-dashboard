import "./navbar.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

// Icons

const NavbarLink = () => {
	return (
		<>
			<Navbar
				expand="lg"
				className="bg-body-tertiary border-b-4 border-green-600"
				bg="light"
				sticky="top"
			>
				<Container>
					<Navbar.Brand as={Link} to={"/"}>
						CLENRO Dashboard
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mx-auto">
							<Nav.Link as={Link} to={"/"}>
								Home
							</Nav.Link>
							<Nav.Link as={Link} to={"/users"}>
								Users
							</Nav.Link>
							<Nav.Link as={Link} to={"/collectors"}>
								Collectors
							</Nav.Link>
							<Nav.Link as={Link} to={"/consolidators"}>
								Consolidators
							</Nav.Link>
							<Nav.Link as={Link} to={"/barangay-admin"}>
								Barangay Admin
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default NavbarLink;
