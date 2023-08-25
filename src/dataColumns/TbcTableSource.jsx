export const TbcTableSource = [
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
		width: 150,
	},

	{
		headerClassName: "headerTheme",

		field: "collector_type",
		headerName: "Collector Type",
		width: 200,
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

		field: "contact_person",
		headerName: "Contact Person",
		width: 200,
	},

	{
		headerClassName: "headerTheme",

		field: "user_type",
		headerName: "User Type",
		width: 150,
	},

	// {
	// 	headerClassName: "headerTheme",

	// 	field: "address",
	// 	headerName: "Address",
	// 	width: 230,

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
];
