export const userColumn = [
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
		width: 200,
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

		field: "household_type",
		headerName: "Household Type",
		width: 180,
	},

	{
		headerClassName: "headerTheme",

		field: "establishment_type",
		headerName: "Establishment Type",
		width: 180,
	},

	{
		headerClassName: "headerTheme",

		field: "user_type",
		headerName: "User Type",
		width: 180,
	},

	{
		headerClassName: "headerTheme",

		field: "email",
		headerName: "Email",
		width: 200,
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

		field: "location",
		headerName: "Location",
		width: 250,
	},

	{
		headerClassName: "headerTheme",

		field: "biodegradable",
		headerName: "Biodegradable",
		width: 150,
	},

	{
		headerClassName: "headerTheme",

		field: "recyclable",
		headerName: "Recyclable",
		width: 150,
	},

	{
		headerClassName: "headerTheme",

		field: "residual",
		headerName: "Residual",
		width: 150,
	},
];
