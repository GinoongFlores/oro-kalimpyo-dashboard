export const TbcTableSource = [
	{
		field: "list",
		headerName: "#",
		width: 50,
	},

	{
		field: "name",
		headerName: "Name",
		width: 150,
	},

	{
		field: "number",
		headerName: "Number",
		width: 150,
	},

	{
		field: "type",
		headerName: "Type of HouseHold",
		width: 200,
	},

	{
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
		field: "barangay",
		headerName: "Barangay",
		width: 150,
	},

	{
		field: "brand",
		headerName: "Brand Collected",
		width: 150,
	},

	{
		field: "kilo",
		headerName: "Kilo",
		width: 100,
	},

	{
		field: "plastic",
		headerName: "Type of Plastics",
		width: 150,
	},

	{
		field: "date",
		headerName: "Date",
		width: 150,
	},
];
