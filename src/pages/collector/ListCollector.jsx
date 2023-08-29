import NavbarLink from "../../components/navbar/NavbarLink";
// import Sidebar from "../../components/sidebar/Sidebar";
import Collector from "../../components/tables/collector/Collector";
import UnCollectedWaste from "../../components/tables/uncollectedWaste/UnCollectedWaste";

const ListCollector = () => {
	return (
		<div className="flex flex-col w-full">
			{/* <Sidebar /> */}
			<NavbarLink />
			<div className="p-12 pt-0">
				<Collector />
				<UnCollectedWaste />
			</div>
		</div>
	);
};

export default ListCollector;
