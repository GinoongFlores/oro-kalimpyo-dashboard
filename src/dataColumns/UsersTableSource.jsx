export const userColumns = [
	{
		field: "list",
		headerName: "#",
		width: 50,
	},

	{
		field: "id",
		headerName: "ID",
		width: 100,
	},

	{
		field: "name",
		headerName: "Name",
		width: 150,
		renderCell: (props) => {
			return (
				<>
					<div className="cellWidth">
						<p>{props.row.name}</p>
					</div>
				</>
			);
		},
	},

	{
		field: "number",
		headerName: "Number",
		width: 120,
	},

	{
		field: "gender",
		headerName: "Gender",
		width: 100,
	},

	{
		field: "email",
		headerName: "Email",
		width: 200,
	},

	{
		field: "user_type",
		headerName: "Type of HouseHold",
		width: 200,
	},

	{
		field: "barangay",
		headerName: "Barangay",
		width: 150,
	},

	{
		field: "address",
		headerName: "Address",
		width: 190,

		renderCell: (props) => {
			return (
				<>
					<div className={`cellWidth ${props.row.address}`}>
						<p>{props.row.address}</p>
					</div>
				</>
			);
		},
	},
];
