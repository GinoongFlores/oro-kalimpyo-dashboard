export const UncollectedColumn = [
	{
		headerClassName: "headerTheme",
		field: "list",
		headerName: "#",
		minWidth: 60,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "barangay",
		headerName: "Barangay",
		minWidth: 150,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "collector_name",
		headerName: "Collector Name",
		minWidth: 200,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "collector_type",
		headerName: "Collector Type",
		minWidth: 180,
		flex: 1,
		renderCell: (props) => {
			return (
				<>
					<div className="cellWidth">
						<p>{props.row.collector_type}</p>
					</div>
				</>
			);
		},
	},

	{
		headerClassName: "headerTheme",
		field: "date",
		headerName: "Date",
		minWidth: 150,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "household_type",
		headerName: "Household Type",
		minWidth: 150,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "kilo",
		headerName: "Kilo",
		minWidth: 100,
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
		field: "user_type",
		headerName: "User Type",
		minWidth: 180,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "waste_type",
		headerName: "Waste Type",
		minWidth: 120,
		flex: 1,
		renderCell: (props) => {
			return (
				<>
					<div className={`cellWidth`}>
						<p>{props.row.waste_type}</p>
					</div>
				</>
			);
		},
	},

	{
		headerClassName: "headerTheme",
		field: "status",
		headerName: "Status",
		minWidth: 180,
		flex: 1,
		renderCell: (props) => {
			return (
				<>
					<div className={`cellWidth`}>
						<p>{props.row.status}</p>
					</div>
				</>
			);
		},
	},

	{
		headerClassName: "headerTheme",
		field: "contribution_proof_url",
		headerName: "Contribution Proof URL",
		minWidth: 180,
		flex: 1,
		renderCell: (props) => {
			return (
				<>
					<div className={`cellWidth`}>
						<a href={`${props.row.contribution_proof_url}`} target="_blank">
							<img
								src={`${props.row.contribution_proof_url}`}
								width={80}
								height={80}
							/>
						</a>
					</div>
				</>
			);
		},
	},

	{
		headerClassName: "headerTheme",
		field: "time",
		headerName: "Time",
		minWidth: 150,
		flex: 1,
	},
];
