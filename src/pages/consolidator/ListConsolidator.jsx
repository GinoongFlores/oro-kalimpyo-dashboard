import NavbarLink from "../../components/navbar/NavbarLink";
// import Sidebar from "../../components/sidebar/Sidebar";
import Consolidator from "../../components/tables/consolidator/Consolidator";

const ListConsolidator = () => {
	return (
		<div className="flex flex-col w-full">
			<NavbarLink />
			<div className="p-12 pt-0">
				<Consolidator />
			</div>
		</div>
	);
};

export default ListConsolidator;
