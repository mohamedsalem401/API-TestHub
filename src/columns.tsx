import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "Key", headerName: "Key" },
  { field: "Value", headerName: "Value" },
];
const rows = [
  { id: 0, Key: "Roxie", Value: "Harvey" },
  { id: 1, Key: "Snow", Value: "Jon" },
  { id: 2, Key: "Lannister", Value: "Cersei" },
  { id: 3, Key: "Lannister", Value: "Jaime" },
];

export function Headers() {
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
        disableEval />
    </Box>
  );
}
