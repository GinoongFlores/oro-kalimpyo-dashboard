import React from "react";
import NavbarLink from "../../components/navbar/NavbarLink";
import ClenroAdmin from "../../components/tables/clenroAdmin/ClenroAdmin";
import BarangayAdmin from "../../components/tables/barangayAdminTable/BarangayAdmin";
import TabsComponent from "../../components/tabs/TabsComponent";

const ListAdmins = () => {
	return (
		<>
			<div className="flex flex-col w-full">
				<NavbarLink />
				<div className="p-0">
					<TabsComponent
						childrenOneLabel="Clenro Admin"
						childrenTwoLabel="Barangay Admin"
						childrenOne={<ClenroAdmin />}
						childrenTwo={<BarangayAdmin />}
					/>
				</div>
			</div>
		</>
	);
};

export default ListAdmins;
