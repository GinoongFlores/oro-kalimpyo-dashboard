import { Link, NavLink } from "react-router-dom";

// import { useAuth } from "../../context/UserAuthContext";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavbarLink = () => {
	// const { logout } = useAuth();
	const Links = [
		{
			name: "Home",
			path: "/barangay-admin",
		},
		{
			name: "Users",
			path: "/barangay-users",
		},
		{
			name: "Collectors",
			path: "/collectors",
		},
	];

	return (
		<>
			<Navbar
				expand="lg"
				bg="light"
				className="bg-[#FBFBFB] py-4 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4"
			>
				<Container>
					<Navbar.Brand href="#home">Welcome Barangay Admin</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							{Links.map((link) => {
								return (
									<li
										className="my-2 pl-2 lg:my-0 lg:px-1 uppercase"
										data-te-nav-item-ref
										key={link.name}
									>
										<NavLink
											to={link.path}
											className={({ isActive }) => {
												return (
													"px-3 py-2 rounded-md font-medium navLinks " +
													(!isActive
														? " hover:bg-green-600 text-gray-300 hover:text-white"
														: "bg-green-600 text-white")
												);
											}}
										>
											{link.name}
										</NavLink>
									</li>
								);
							})}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default NavbarLink;
