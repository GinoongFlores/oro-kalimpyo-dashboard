import NavbarLink from "../../components/navbar/NavbarLink";
// import Sidebar from "../../components/sidebar/Sidebar";
import Collector from "../../components/tables/collector/Collector";

const ListCollector = () => {
	return (
		<div className="flex flex-col w-full">
			{/* <Sidebar /> */}
			<NavbarLink />
			<div className="p-12 pt-0">
				<Collector />
			</div>
		</div>
	);
};

export default ListCollector;
