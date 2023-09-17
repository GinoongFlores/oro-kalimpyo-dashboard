import React from "react";
import NavbarLink from "../../components/navbar/NavbarLink";
import ClenroAdmin from "../../components/tables/clenroAdmin/ClenroAdmin";
import BarangayAdmin from "../../components/tables/barangayAdminTable/BarangayAdmin";
import TabsComponent from "../../components/tabs/TabsComponent";

const ListAdmins = () => {
	return (
		<>
			<NavbarLink />
			<TabsComponent
				childrenOneLabel="Clenro Admin"
				childrenTwoLabel="Barangay Admin"
				childrenOne={<ClenroAdmin />}
				childrenTwo={<BarangayAdmin />}
			/>
		</>
	);
};

export default ListAdmins;
