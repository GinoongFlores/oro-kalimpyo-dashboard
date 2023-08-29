export const CollectorColumn = [
	{
		headerClassName: "headerTheme",
		field: "list",
		headerName: "#",
		width: 60,
	},
	{
		headerClassName: "headerTheme",
		field: "name",
		headerName: "Name",
		width: 350,
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
		width: 250,
	},

	{
		headerClassName: "headerTheme",
		field: "collector_type",
		headerName: "Collector Type",
		width: 250,
	},

	{
		headerClassName: "headerTheme",
		field: "email",
		headerName: "Email",
		width: 300,
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
		field: "contact_person",
		headerName: "Contact Person",
		width: 350,
	},

	{
		headerClassName: "headerTheme",
		field: "user_type",
		headerName: "User Type",
		width: 250,
	},
];
