export const CompletedTableSource = [
	{
		headerClassName: "headerTheme",
		field: "list",
		headerName: "#",
		width: 50,
	},

	{
		headerClassName: "headerTheme",
		field: "name",
		headerName: "Name",
		width: 150,
	},

	{
		headerClassName: "headerTheme",
		field: "number",
		headerName: "Number",
		width: 150,
	},

	{
		headerClassName: "headerTheme",
		field: "type",
		headerName: "Type of HouseHold",
		width: 200,
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

	{
		headerClassName: "headerTheme",
		field: "barangay",
		headerName: "Barangay",
		width: 150,
	},

	{
		headerClassName: "headerTheme",
		field: "brand",
		headerName: "Brand Collected",
		width: 150,
	},

	{
		headerClassName: "headerTheme",
		field: "kilo",
		headerName: "Kilo",
		width: 100,
	},

	{
		headerClassName: "headerTheme",
		field: "total_kilo",
		headerName: "Total Kilo",
		width: 100,
	},

	{
		headerClassName: "headerTheme",
		field: "total_contributions",
		headerName: "Total Contributions",
		width: 200,
		renderCell: (props) => {
			return (
				<>
					<div className={`cellWidth ${props.row.total_contributions}`}>
						<p>{props.row.total_contributions}</p>
					</div>
				</>
			);
		},
	},

	{
		headerClassName: "headerTheme",
		field: "plastic",
		headerName: "Type of Plastics",
		width: 150,
	},

	{
		headerClassName: "headerTheme",
		field: "time",
		headerName: "Time",
		width: 100,
	},

	{
		headerClassName: "headerTheme",
		field: "date",
		headerName: "Date",
		width: 150,
	},
];
