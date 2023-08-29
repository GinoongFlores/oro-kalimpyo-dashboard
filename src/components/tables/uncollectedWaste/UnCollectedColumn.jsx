export const UncollectedColumn = [
  {
    headerClassName: "headerTheme",
    field: "list",
    headerName: "#",
    width: 60,
  },

  {
    headerClassName: "headerTheme",
    field: "barangay",
    headerName: "Barangay",
    width: 150,
  },

  {
    headerClassName: "headerTheme",
    field: "collector_name",
    headerName: "Collector Name",
    width: 200,
  },

  {
    headerClassName: "headerTheme",
    field: "collector_type",
    headerName: "Collector Type",
    width: 180,
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
    width: 150,
  },

  {
    headerClassName: "headerTheme",
    field: "household_type",
    headerName: "Household Type",
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
    field: "user_type",
    headerName: "User Type",
    width: 180,
  },

  {
    headerClassName: "headerTheme",
    field: "waste_type",
    headerName: "Waste Type",
    width: 120,
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
    width: 180,
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
    width: 180,
    renderCell: (props) => {
      return (
        <>
          <div className={`cellWidth`}>
            <a href={`${props.row.contribution_proof_url}`} target="_blank">
              <img src={`${props.row.contribution_proof_url}`} width={80} height={80} />
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
    width: 150,
  },
];
