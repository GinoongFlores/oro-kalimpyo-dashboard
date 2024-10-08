import NavbarLink from "../../components/navbar/NavbarLink";
import BarangayAdmin from "../../components/tables/barangayAdminTable/BarangayAdmin";
import ShowModal from "../../components/modals/ShowModal";
import AddBarangayAdmin from "../../components/forms/AddBarangayAdmin";

const ListBarangayAdmin = () => {
	return (
		<div className="flex flex-col w-full">
			<NavbarLink />
			<div className="p-12">
				<div className="flex flex-col justify-around items-center mb-4">
					<h2 className="text-2xl ">Barangay Admins</h2>
					<ShowModal adminType="Barangay" specifyForm={<AddBarangayAdmin />} />
				</div>
				<BarangayAdmin />
			</div>
		</div>
	);
};

export default ListBarangayAdmin;
