import "./userData.scss";

// Packages
import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Firebase
import { db } from "../../firebase";
import { ref, onValue, remove, set } from "firebase/database";

// Firebase auth
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

// Table Columns
import { userColumns } from "../../dataColumns/UsersTableSource";

// Modals and Pages
import EditUser from "../modals/editUser/EditUser";
import ViewUser from "../modals/viewUser/ViewUser";

const UserData = () => {
	const [userData, setUserData] = useState([]);

	const actionColumn = [
		{
			field: "action",
			headerName: "Action",
			headerClassName: "headerTheme",
			width: 200,
			renderCell: (params) => {
				return (
					<>
						<div className="cellAction">
							<ViewUser params={params} />
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
		if (window.confirm("Are you sure you want to delete this user?")) {
			const userRef = ref(db, `/Nazareth_Users/${id}`);
			// console.log(`/Nazareth_Users/${id}`);
			// console.log(userRef);
			remove(userRef)
				.then(() => {
					setUserData(userData.filter((user) => user.id !== id));
					toast.success("User deleted successfully");
				})
				.catch((error) => {
					toast.error(error.message);
				});

			// const user = auth.currentUser;
			// if (user) {
			// 	user.delete().then((result) => {
			// 		console.log(result);
			// 	});
			// }
		}
	};

	// Read data from firebase database
	const getData = () => {
		const usersRef = ref(db, "/Nazareth_Users/");
		const readData = onValue(usersRef, (snapshot) => {
			const data = snapshot.val();
			setUserData(Object.values(data));
		});
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<div className="dataTable">
				<div style={{ height: 600, width: "100%" }}>
					<div style={{ display: "flex", height: "100%" }}>
						{userData && (
							<DataGrid
								rows={userData.map((user, index) => {
									return {
										...user,
										list: index + 1,
									};
								})}
								columns={userColumns.concat(actionColumn)}
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

export default UserData;
