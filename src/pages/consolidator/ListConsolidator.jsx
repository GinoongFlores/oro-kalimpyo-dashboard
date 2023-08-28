import "./listConsolidator.scss";

import NavbarLink from "../../components/navbar/NavbarLink";
// import Sidebar from "../../components/sidebar/Sidebar";
import Consolidator from "../../components/tables/consolidator/Consolidator";

const ListConsolidator = () => {
	return (
		<div className="listCompleted">
			{/* <Sidebar /> */}
			<div className="listContainer">
				<NavbarLink />
				<Consolidator />
			</div>
		</div>
	);
};

export default ListConsolidator;
