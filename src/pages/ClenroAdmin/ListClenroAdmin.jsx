import React from "react";
import NavbarLink from "../../components/navbar/NavbarLink";
import ClenroAdmin from "../../components/tables/clenroAdmin/ClenroAdmin";
import AddModal from "../../components/modals/AddModal";
import AddClenroAdmin from "../../components/forms/AddClenroAdmin";
const ListClenroAdmin = () => {
	return (
		<>
			<div className="flex flex-col w-full">
				<NavbarLink />
				<div className="p-12">
					<div className="flex flex-col justify-around items-center mb-4">
						<h2 className="text-2xl ">CLENRO Admins</h2>
						<AddModal adminType="CLENRO" specifyForm={<AddClenroAdmin />} />
					</div>
					<ClenroAdmin />
				</div>
			</div>
		</>
	);
};

export default ListClenroAdmin;
