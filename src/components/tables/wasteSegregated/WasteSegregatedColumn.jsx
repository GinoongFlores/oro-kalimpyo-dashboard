export const WasteSegregatedColumn = [
	{
		headerClassName: "headerTheme",
		field: "list",
		headerName: "#",
		minWidth: 60,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "brand",
		headerName: "Brand",
		flex: 1,
		minWidth: 250,
		renderCell: (props) => {
			return (
				<>
					<div className="cellWidth">
						<p>{props.row.brand}</p>
					</div>
				</>
			);
		},
	},

	{
		headerClassName: "headerTheme",
		field: "kilo",
		headerName: "Kilo",
		minWidth: 120,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "plastic_name",
		headerName: "Plastic Name",
		minWidth: 300,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "plastic_type",
		headerName: "Plastic Type",
		minWidth: 300,
		flex: 1,
	},

	{
		headerClassName: "headerTheme",
		field: "waste_type",
		headerName: "Waste Type",
		minWidth: 300,
		flex: 1,
	},
];
