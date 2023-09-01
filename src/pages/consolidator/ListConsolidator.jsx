import NavbarLink from "../../components/navbar/NavbarLink";
// import Sidebar from "../../components/sidebar/Sidebar";
import Consolidator from "../../components/tables/consolidator/Consolidator";
import WasteSegregated from "../../components/tables/wasteSegregated/WasteSegregated";
import TabsComponent from "../../components/tabs/TabsComponent";

const ListConsolidator = () => {
	return (
		<div className="flex flex-col w-full">
			<NavbarLink />
			<div className="p-0">
				<TabsComponent
					childrenOneLabel="Consolidator"
					childrenTwoLabel="Waste Segregated"
					childrenOne={<Consolidator />}
					childrenTwo={<WasteSegregated />}
				/>
			</div>
		</div>
	);
};

export default ListConsolidator;
