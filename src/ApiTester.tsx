import { useState } from "react";
import { Box } from "@mui/material";
import "highlight.js/styles/atom-one-dark.css";
// import { ResponseDiplayer } from "./ResponseDiplayer";
// import { RequestHandler } from "./RequestHandler";
import { useSelector } from "react-redux";
import { HttpState } from "./state/store";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ResponseContainer } from "./ResponseContainer";
import { RequestContainer } from "./RequestContainer";

const columns: GridColDef[] = [
  { field: "Key", headerName: "Key" },
  { field: "Value", headerName: "Value" },
];

const rows = [
  { id: 0, Key: "Roxie", Value: "Harvey" },
  { id: 1, Key: "Snow", Value: "Jon" },
  { id: 2, Key: "Lannister", Value: "Cersei" },
  { id: 3, Key: "Lannister", Value: "Jaime" },
  // { id: 4, Key: "Stark", Value: "Arya" },
  // { id: 5, Key: "Targaryen", Value: "Daenerys" },
  // { id: 6, Key: "Melisandre", Value: null },
  // { id: 7, Key: "Clifford", Value: "Ferrara" },
  // { id: 8, Key: "Frances", Value: "Rossini" },
  // { id: 9, Key: "Roxie", Value: "Harvey" },
];

export function DataGridDemo() {
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        sx={{ width: "100%" }}
        rows={rows}
        columns={columns}
        density="comfortable"
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        checkboxSelection
        disableRowSelectionOnClick
        disableVirtualization
        disableDensitySelector
        disableEval
      />
    </Box>
  );
}

const ApiEndpoint = ({ index }: { index: number }) => {
  const request = useSelector((store: HttpState) => store);
  // const [request, setRequest] = useState(initialState);
  const handleRequestChange = () => {
    // setRequest(newRequest);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: "80px",
      }}
    >
      <RequestContainer index={index} />
      <ResponseContainer index={index} />
    </Box>
  );
};

export default ApiEndpoint;
