import NavbarLink from "../../components/navbar/NavbarLink";
// import Sidebar from "../../components/sidebar/Sidebar";
import Collector from "../../components/tables/collector/Collector";
import UnCollectedWaste from "../../components/tables/uncollectedWaste/UnCollectedWaste";
import TabsComponent from "../../components/tabs/TabsComponent";
import WasteContribution from "../../components/tables/wasteContribution/WasteContribution";

const ListCollector = () => {
	return (
		<>
			<NavbarLink />
			<TabsComponent
				childrenOneLabel="Collector"
				childrenTwoLabel="Waste Contributions"
				childrenThreeLabel="Uncollected Waste"
				childrenOne={<Collector />}
				childrenTwo={<WasteContribution />}
				childrenThree={<UnCollectedWaste />}
			/>
		</>
	);
};

export default ListCollector;
