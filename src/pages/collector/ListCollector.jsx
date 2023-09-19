import NavbarLink from "../../components/navbar/NavbarLink";
// import Sidebar from "../../components/sidebar/Sidebar";
import Collector from "../../components/tables/collector/Collector";
import TabsComponent from "../../components/tabs/TabsComponent";
import WasteContribution from "../../components/tables/wasteContribution/WasteContribution";
import Overview from "./Overview";

const ListCollector = () => {
	return (
		<>
			<NavbarLink />
			<TabsComponent
				childrenOneLabel="Collector"
				childrenTwoLabel="Waste Contributions"
				childrenThreeLabel="Overview"
				childrenOne={<Collector />}
				childrenTwo={<WasteContribution />}
				childrenThree={<Overview />}
			/>
		</>
	);
};

export default ListCollector;
