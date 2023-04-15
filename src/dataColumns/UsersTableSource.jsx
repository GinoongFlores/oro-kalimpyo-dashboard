export const userColumns = [
	{
		headerClassName: "headerTheme",

		field: "list",
		headerClassName: "headerTheme",
		headerName: "#",
		width: 50,
	},

	// {

	// 	field: "id",
	// 	headerName: "ID",
	// 	width: 100,
	// },

	{
		headerClassName: "headerTheme",

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
		headerClassName: "headerTheme",

		field: "number",
		headerName: "Number",
		width: 120,
	},

	{
		headerClassName: "headerTheme",

		field: "gender",
		headerName: "Gender",
		width: 100,
	},

	{
		headerClassName: "headerTheme",

		field: "email",
		headerName: "Email",
		width: 200,
	},

	{
		headerClassName: "headerTheme",

		field: "user_type",
		headerName: "Type of HouseHold",
		width: 200,
	},

	{
		headerClassName: "headerTheme",

		field: "barangay",
		headerName: "Barangay",
		width: 150,
	},

	{
		headerClassName: "headerTheme",

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
