import "./listUser.scss";

import NavbarLink from "../../components/navbar/NavbarLink";
// import Sidebar from "../../components/sidebar/Sidebar";
import UserData from "../../components/tables/users/UserData";
import WasteContribution from "../../components/tables/wasteContribution/WasteContribution";

const ListUser = () => {
	return (
		<div className="flex flex-col w-full">
			<NavbarLink />
			<div className="p-12 pt-0">
				<UserData />
				<WasteContribution />
			</div>
		</div>
	);
};

export default ListUser;
