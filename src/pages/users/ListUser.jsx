import NavbarLink from "../../components/navbar/NavbarLink";
// import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import UserData from "../../components/tables/users/UserData";
import WasteContribution from "../../components/tables/wasteContribution/WasteContribution";
import TabsComponent from "../../components/tabs/TabsComponent";

const ListUser = () => {
	return (
		<div className="flex flex-col w-full">
			<NavbarLink />
			<div className="p-0">
				<TabsComponent
					childrenOneLabel="Waste Generators"
					childrenTwoLabel="Waste Contributions"
					childrenOne={<UserData />}
					childrenTwo={<WasteContribution />}
				/>
			</div>
		</div>
	);
};

export default ListUser;
