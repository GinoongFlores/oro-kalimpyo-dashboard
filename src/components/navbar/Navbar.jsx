import "./navbar.scss";

// Icons
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const Navbar = () => {
	return (
		<div className="navbar">
			<div className="navbarWrapper">
				<div className="search">
					<h2>CLENRO Admin</h2>
				</div>
				<div className="items">
					<div className="item">
						<img
							src="https://images.pexels.com/photos/14922901/pexels-photo-14922901.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
							alt="avatar"
							className="avatar"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
