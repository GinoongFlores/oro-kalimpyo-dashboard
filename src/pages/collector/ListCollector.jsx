import "./listCollector.scss";

import NavbarLink from "../../components/navbar/NavbarLink";
// import Sidebar from "../../components/sidebar/Sidebar";
import Collector from "../../components/tables/collector/Collector";

const ListCollector = () => {
	return (
		<div className="listTBC">
			{/* <Sidebar /> */}
			<div className="listContainer">
				<NavbarLink />
				<Collector />
			</div>
		</div>
	);
};

export default ListCollector;
