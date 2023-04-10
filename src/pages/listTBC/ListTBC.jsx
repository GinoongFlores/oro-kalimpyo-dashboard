import "./listTBC.scss";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { TbcData } from "../../components/tbcDataTable/TbcData";

const ListTBC = () => {
	return (
		<div className="listTBC">
			<Sidebar />
			<div className="listContainer">
				<Navbar />
				<TbcData />
			</div>
		</div>
	);
};

export default ListTBC;
