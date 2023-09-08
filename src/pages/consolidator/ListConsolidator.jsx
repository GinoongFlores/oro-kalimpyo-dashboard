import NavbarLink from "../../components/navbar/NavbarLink";
// import Sidebar from "../../components/sidebar/Sidebar";
import Consolidator from "../../components/tables/consolidator/Consolidator";
import WasteSegregated from "../../components/tables/wasteSegregated/WasteSegregated";
import TabsComponent from "../../components/tabs/TabsComponent";

const ListConsolidator = () => {
	return (
		<>
			<NavbarLink />
			<TabsComponent
				childrenOneLabel="Consolidator"
				childrenTwoLabel="Waste Segregated"
				childrenOne={<Consolidator />}
				childrenTwo={<WasteSegregated />}
			/>
		</>
	);
};

export default ListConsolidator;
