import "./listCompleted.scss";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import CompletedData from "../../components/completedDataTable/CompletedData";

const ListCompleted = () => {
	return (
		<div className="listCompleted">
			<Sidebar />
			<div className="listContainer">
				<Navbar />
				<CompletedData />
			</div>
		</div>
	);
};

export default ListCompleted;
