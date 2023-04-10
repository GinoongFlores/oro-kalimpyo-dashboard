import "./listBarangayAdmin.scss";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import BarangayAdminData from "../../components/barangayAdminTable/BarangayAdminData";
import AddUser from "../../components/modals/addUser/AddUser";

const ListBarangayAdmin = () => {
	return (
		<div className="listBarangayAdmin">
			<Sidebar />
			<div className="listContainer">
				<Navbar />
				<AddUser />
				<BarangayAdminData />
			</div>
		</div>
	);
};

export default ListBarangayAdmin;
