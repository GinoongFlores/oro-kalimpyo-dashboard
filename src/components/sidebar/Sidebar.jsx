import "./sidebar.scss";

// Icons
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import PublishedWithChangesRoundedIcon from "@mui/icons-material/PublishedWithChangesRounded";
import AutoDeleteRoundedIcon from "@mui/icons-material/AutoDeleteRounded";
import dashboardLogo from "../../assets/oro-kalimpyo-small.png";

// Packages
import { Link } from "react-router-dom";
import { useAuth } from "../../context/UserAuthContext";

const Sidebar = () => {
	const { logout } = useAuth();

	return (
		<div className="sidebar">
			<div className="top">
				<Link to="/" className="sidebarLink">
					{/* <div className="logo">
						<img src={dashboardLogo} alt="" />
					</div> */}
					<span className="logo">Barangay Admin</span>
				</Link>
			</div>
			<hr />
			<div className="center">
				<ul className="listSidebar">
					<p className="title">MAIN</p>
					<Link to="/" className="sidebarLink">
						<li>
							<DashboardRoundedIcon className="icon" />
							<span>Dashboard</span>
						</li>
					</Link>
					<Link to="/users" className="sidebarLink">
						<li>
							<PeopleRoundedIcon className="icon" />
							<span>Nazareth Accounts</span>
						</li>
					</Link>
					<Link to="/tbc" className="sidebarLink">
						<li>
							<AutoDeleteRoundedIcon className="icon" />
							<span>Uncollected</span>
						</li>
					</Link>
					<Link to="/completed" className="sidebarLink">
						<li>
							<PublishedWithChangesRoundedIcon className="icon" />
							<span>Completed</span>
						</li>
					</Link>

					<p className="title">QUICK MENU</p>
					<li onClick={() => logout()}>
						<ExitToAppRoundedIcon className="icon" />
						<span>Logout</span>
					</li>
				</ul>
			</div>
			{/* <div className="bottom">
				<div className="colorOption"></div>
				<div className="colorOption"></div>
			</div> */}
		</div>
	);
};

export default Sidebar;
