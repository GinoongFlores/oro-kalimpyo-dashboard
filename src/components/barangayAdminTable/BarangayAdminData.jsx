import "./barangayAdmin.scss";

// Packages
import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Firebase
import { db } from "../../firebase";
import { ref, onValue, remove, set } from "firebase/database";

// Table Columns
import { BarangayAdmin } from "../../dataColumns/BarangayAdminTableSource";

// Modals and Pages
import EditUser from "../../components/modals/editUser/EditUser";
// import ViewUser from "../../components/modals/viewUser/ViewUser";

const BarangayAdminData = () => {
	const [userData, setUserData] = useState([]);

	const actionColumn = [
		{
			field: "action",
			headerName: "Action",
			headerClassName: "headerTheme",
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<div className="cellAction">
							<EditUser params={params} />
							<button
								onClick={() => handleDelete(params.row.id)}
								className="deleteButton"
							>
								Delete
							</button>
						</div>
					</>
				);
			},
		},
	];

	const handleDelete = (id) => {
		// console.log(id);
		// delete also the user for the authentication
		// if (window.confirm("Are you sure you want to delete this admin?")) {
		// 	const userRef = ref(db, `/BarangayAdmin/${id}`);
		// 	// console.log(`/Nazareth_Users/${id}`);
		// 	// console.log(userRef);
		// 	remove(userRef)
		// 		.then(() => {
		// 			setUserData(userData.filter((user) => user.id !== id));
		// 			toast.success("Admin deleted successfully");
		// 		})
		// 		.catch((error) => {
		// 			toast.error(error.message);
		// 		});
		// 	// const user = auth.currentUser;
		// 	// if (user) {
		// 	// 	user.delete().then((result) => {
		// 	// 		console.log(result);
		// 	// 	});
		// 	// }
		// }
	};

	// Read data from firebase database
	// const getData = () => {
	// 	const usersRef = ref(db, "/BarangayAdmin/");
	// 	const readData = onValue(usersRef, (snapshot) => {
	// 		const data = snapshot.val();
	// 		setUserData(Object.values(data));
	// 	});
	// };
	// useEffect(() => {
	// 	getData();
	// }, []);

	return (
		<>
			<div className="dataTable">
				<div style={{ display: "flex", height: "100%" }}>
					<div style={{ height: 600, width: "100%" }}>
						{userData && (
							<DataGrid
								className="dataGrid"
								rows={userData.map((user, index) => {
									return {
										...user,
										list: index + 1,
									};
								})}
								columns={BarangayAdmin.concat(actionColumn)}
								pageSize={9}
								rowsPerPageOptions={[9]}
								components={{ Toolbar: GridToolbar }}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default BarangayAdminData;
