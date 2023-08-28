import "./sidebar.scss";

// Icons
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import PublishedWithChangesRoundedIcon from "@mui/icons-material/PublishedWithChangesRounded";
import AutoDeleteRoundedIcon from "@mui/icons-material/AutoDeleteRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
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
					<span className="logo">CLENRO Dashboard</span>
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
							<span>Users</span>
						</li>
					</Link>

					<Link to="/collectors" className="sidebarLink">
						<li>
							<AutoDeleteRoundedIcon className="icon" />
							<span>Collectors</span>
						</li>
					</Link>

					<Link to="/consolidators" className="sidebarLink">
						<li>
							<PublishedWithChangesRoundedIcon className="icon" />
							<span>Consolidators</span>
						</li>
					</Link>

					<p className="title">QUICK MENU</p>
					<Link to="/barangay-admin" className="sidebarLink">
						<li>
							<AdminPanelSettingsRoundedIcon className="icon" />
							<span>Barangay Admin</span>
						</li>
					</Link>

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
