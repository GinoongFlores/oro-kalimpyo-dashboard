import NavbarLink from "../../components/navbar/NavbarLink";
// import Sidebar from "../../components/sidebar/Sidebar";
import BarangayAdminData from "../../components/tables/barangayAdminTable/BarangayAdminData";

const ListBarangayAdmin = () => {
	return (
		<div className="listBarangayAdmin">
			{/* <Sidebar /> */}
			<div className="listContainer">
				<NavbarLink />
				{/* <AddUser /> */}
				<BarangayAdminData />
			</div>
		</div>
	);
};

export default ListBarangayAdmin;
