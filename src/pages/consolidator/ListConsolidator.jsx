import NavbarLink from "../../components/navbar/NavbarLink";
// import Sidebar from "../../components/sidebar/Sidebar";
import Consolidator from "../../components/tables/consolidator/Consolidator";
import WasteSegregated from "../../components/tables/wasteSegregated/WasteSegregated";
import TabsComponent from "../../components/tabs/TabsComponent";
import Overview from "./Overview";

const ListConsolidator = () => {
	return (
		<>
			<NavbarLink />
			<TabsComponent
				childrenOneLabel="Consolidator"
				childrenTwoLabel="Waste Segregated"
				childrenThreeLabel="Overview"
				childrenOne={<Consolidator />}
				childrenTwo={<WasteSegregated />}
				childrenThree={<Overview />}
			/>
		</>
	);
};

export default ListConsolidator;
