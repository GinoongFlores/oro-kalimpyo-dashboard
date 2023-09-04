import NavbarLink from "../../components/navbar/NavbarLink";
// import Sidebar from "../../components/sidebar/Sidebar";
import Collector from "../../components/tables/collector/Collector";
import UnCollectedWaste from "../../components/tables/uncollectedWaste/UnCollectedWaste";
import TabsComponent from "../../components/tabs/TabsComponent";
import WasteContribution from "../../components/tables/wasteContribution/WasteContribution";

const ListCollector = () => {
	return (
		<div className="flex flex-col w-full">
			{/* <Sidebar /> */}
			<NavbarLink />
			<div className="p-0">
				<TabsComponent
					childrenOneLabel="Collector"
					childrenTwoLabel="Waste Contributions"
					childrenThreeLabel="Uncollected Waste"
					childrenOne={<Collector />}
					childrenTwo={<WasteContribution />}
					childrenThree={<UnCollectedWaste />}
				/>
			</div>
		</div>
	);
};

export default ListCollector;
