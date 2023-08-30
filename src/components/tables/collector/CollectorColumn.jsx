export const CollectorColumn = [
	{
		headerClassName: "headerTheme",
		field: "list",
		headerName: "#",
		minWidth: 60,
		flex: 1,
	},
	{
		headerClassName: "headerTheme",
		field: "name",
		headerName: "Name",
		minWidth: 350,
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
		minWidth: 250,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "collector_type",
		headerName: "Collector Type",
		minWidth: 250,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "email",
		headerName: "Email",
		minWidth: 300,
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
		field: "contact_person",
		headerName: "Contact Person",
		minWidth: 350,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "user_type",
		headerName: "User Type",
		minWidth: 250,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "date_create",
		headerName: "Date Created",
		minWidth: 250,
		flex: 1,
	},
];
