import NavbarLink from "../../components/navbar/NavbarLink";
import UserData from "../../components/tables/users/UserData";
import WasteContribution from "../../components/tables/wasteContribution/WasteContribution";
import TabsComponent from "../../components/tabs/TabsComponent";
import Overview from "./Overview";

const ListUser = () => {
	return (
		<>
			<NavbarLink />
			<TabsComponent
				childrenOneLabel="Waste Generators"
				childrenTwoLabel="Waste Contributions"
				childrenThreeLabel="Overview"
				childrenOne={<UserData />}
				childrenTwo={<WasteContribution />}
				childrenThree={<Overview />}
			/>
		</>
	);
};

export default ListUser;
