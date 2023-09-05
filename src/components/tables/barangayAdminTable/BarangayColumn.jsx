export const BarangayColumn = [
	{
		headerClassName: "headerTheme",
		field: "list",
		headerName: "#",
		minWidth: 50,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "name",
		headerName: "Name",
		minWidth: 150,
		flex: 1,
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
		flex: 1,
		minWidth: 200,
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
		minWidth: 200,
		flex: 1,
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
		flex: 1,
		minWidth: 150,
	},

	{
		headerClassName: "headerTheme",
		field: "address",
		headerName: "Address",
		flex: 1,
		minWidth: 250,

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
