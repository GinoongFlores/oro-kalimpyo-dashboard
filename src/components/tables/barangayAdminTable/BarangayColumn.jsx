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
		field: "createdAt",
		headerName: "Date Created",
		minWidth: 150,
		flex: 1,
		renderCell: (props) => {
			return (
				<>
					<div className="cellWidth">
						<p>{props.row.createdAt}</p>
					</div>
				</>
			);
		},
	},

	{
		headerClassName: "headerTheme",
		field: "firstName",
		headerName: "First Name",
		minWidth: 150,
		flex: 1,
		renderCell: (props) => {
			return (
				<>
					<div className="cellWidth">
						<p>{props.row.firstName}</p>
					</div>
				</>
			);
		},
	},

	{
		headerClassName: "headerTheme",
		field: "lastName",
		headerName: "Last Name",
		minWidth: 150,
		flex: 1,
		renderCell: (props) => {
			return (
				<>
					<div className="cellWidth">
						<p>{props.row.lastName}</p>
					</div>
				</>
			);
		},
	},

	{
		headerClassName: "headerTheme",
		field: "barangay",
		headerName: "Barangay",
		minWidth: 150,
		flex: 1,
		renderCell: (props) => {
			return (
				<>
					<div className="cellWidth">
						<p>{props.row.barangay}</p>
					</div>
				</>
			);
		},
	},

	{
		headerClassName: "headerTheme",
		field: "address",
		headerName: "Address",
		minWidth: 150,
		flex: 1,
		renderCell: (props) => {
			return (
				<>
					<div className="cellWidth">
						<p>{props.row.address}</p>
					</div>
				</>
			);
		},
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
					<div className="cellWidth">
						<p>{props.row.email}</p>
					</div>
				</>
			);
		},
	},
];
