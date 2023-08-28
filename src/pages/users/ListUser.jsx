import "./listUser.scss";

import NavbarLink from "../../components/navbar/NavbarLink";
// import Sidebar from "../../components/sidebar/Sidebar";
import UserData from "../../components/tables/users/UserData";

const ListUser = () => {
	return (
		<div className="listUsers">
			{/* <Sidebar /> */}
			<div className="listContainer">
				<NavbarLink />
				<UserData />
			</div>
		</div>
	);
};

export default ListUser;
