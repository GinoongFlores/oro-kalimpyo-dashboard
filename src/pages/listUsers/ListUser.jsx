import "./listUser.scss";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import UserData from "../../components/userDataTable/UserData";

const ListUser = () => {
	return (
		<div className="listUsers">
			<Sidebar />
			<div className="listContainer">
				<Navbar />
				<UserData />
			</div>
		</div>
	);
};

export default ListUser;
