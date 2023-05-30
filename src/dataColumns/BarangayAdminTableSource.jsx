export const BarangayAdmin = [
	{
		headerClassName: "headerTheme",
		field: "list",
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
		width: 200,
		renderCell: (props) => {
			return (
				<>
					<div className="cellWidth">
						<p>{props.row.number}</p>
					</div>
				</>
			);
		},
	},

	{
		headerClassName: "headerTheme",
		field: "email",
		headerName: "Email",
		width: 200,
		renderCell: (props) => {
			return (
				<>
					<div className={`cellWidth ${props.row.email}`}>
						<p>{props.row.email}</p>
					</div>
				</>
			);
		},
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
		width: 250,

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
