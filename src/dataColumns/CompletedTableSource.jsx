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
		width: 250,
	},

	{
		headerClassName: "headerTheme",
		field: "contact_person",
		headerName: "Contact Person",
		width: 150,
	},

	{
		headerClassName: "headerTheme",
		field: "number",
		headerName: "Number",
		width: 200,
	},

	{
		headerClassName: "headerTheme",
		field: "user_type",
		headerName: "User Type",
		width: 200,
	},

	// {
	// 	headerClassName: "headerTheme",
	// 	field: "address",
	// 	headerName: "Address",
	// 	width: 190,

	// 	renderCell: (props) => {
	// 		return (
	// 			<>
	// 				<div className={`cellWidth ${props.row.address}`}>
	// 					<p>{props.row.address}</p>
	// 				</div>
	// 			</>
	// 		);
	// 	},
	// },

	// {
	// 	headerClassName: "headerTheme",
	// 	field: "total_contributions",
	// 	headerName: "Total Contributions",
	// 	width: 100,
	// 	renderCell: (props) => {
	// 		return (
	// 			<>
	// 				<div className={`cellWidth ${props.row.total_contributions}`}>
	// 					<p>{props.row.total_contributions}</p>
	// 				</div>
	// 			</>
	// 		);
	// 	},
	// },

	{
		headerClassName: "headerTheme",
		field: "date_create",
		headerName: "Date Created",
		width: 300,
	},
];
