// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// Icons

const drawerWidth = 240;
const navItems = [
	{
		name: "Home",
		link: "/",
	},
	{
		name: "Users",
		link: "/users",
	},
	{
		name: "Collectors",
		link: "/collectors",
	},
	{
		name: "Consolidators",
		link: "/consolidators",
	},
	// {
	// 	name: "Barangay Admin",
	// 	link: "/barangay-admin",
	// },
];

const NavbarLink = (props) => {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Typography variant="h6" sx={{ my: 2 }}>
				CLENRO Dashboard
			</Typography>
			<Divider />
			<List>
				{navItems.map((item, index) => (
					<ListItem key={index} disablePadding>
						<Link
							to={item.link}
							key={index}
							className="no-underline w-full border-b-2"
						>
							<ListItemButton className="text-black text-center">
								<ListItemText primary={item.name} />
							</ListItemButton>
						</Link>
					</ListItem>
				))}
			</List>
		</Box>
	);
	const container =
		window !== undefined ? () => window().document.body : undefined;
	return (
		<>
			{/* <Navbar
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
			</Navbar> */}
			<Box sx={{ display: "flex" }} className="my-4">
				<CssBaseline />
				<AppBar component="nav">
					<Toolbar className="headerTheme">
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { sm: "none" } }}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
						>
							CLENRO Dashboard
						</Typography>
						<Box sx={{ display: { xs: "none", sm: "block" } }}>
							{navItems.map((item, index) => (
								<Link key={index} to={item.link}>
									<Button key={index} sx={{ color: "#fff" }}>
										{item.name}
									</Button>
								</Link>
							))}
						</Box>
					</Toolbar>
				</AppBar>
				<nav>
					<Drawer
						container={container}
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							display: { xs: "block", sm: "none" },
							"& .MuiDrawer-paper": {
								boxSizing: "border-box",
								width: drawerWidth,
							},
						}}
					>
						{drawer}
					</Drawer>
				</nav>
			</Box>
		</>
	);
};

export default NavbarLink;
