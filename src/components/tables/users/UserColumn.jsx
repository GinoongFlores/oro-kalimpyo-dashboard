export const userColumn = [
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
		minWidth: 200,
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
		minWidth: 150,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "household_type",
		headerName: "Household Type",
		minWidth: 180,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "establishment_type",
		headerName: "Establishment Type",
		minWidth: 180,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "location",
		headerName: "Location",
		minWidth: 200,
		flex: 1,
		renderCell: (props) => {
			return (
				<>
					<div className={`cellWidth`}>
						<p>{props.row.location}</p>
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
					<div className={`cellWidth`}>
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
		minWidth: 180,
		flex: 1,
		renderCell: (props) => {
			return (
				<>
					<div className={`cellWidth`}>
						<p>{props.row.barangay}</p>
					</div>
				</>
			);
		},
	},

	{
		headerClassName: "headerTheme",
		field: "date_create",
		headerName: "Date Created",
		minWidth: 250,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "biodegradable",
		headerName: "Biodegradable",
		minWidth: 150,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "recyclable",
		headerName: "Recyclable",
		minWidth: 150,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "residual",
		headerName: "Residual",
		minWidth: 150,
		flex: 1,
	},
];
