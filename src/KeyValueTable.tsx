import { Box } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  MuiEvent,
} from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "key", headerName: "key", editable: true },
  { field: "value", headerName: "value", editable: true },
];

export function KeyValueTable({
  rows,
  onChange,
}: {
  rows: {
    id: number;
    key: string;
    value: string;
  }[];
  onChange?: (
    rowIndex: number,
    changedColumn: string,
    newValue: string
  ) => void;
}) {
  // if onChange is undefined, make the rows uneditable
  if (!onChange) {
    for (let index = 0; index < columns.length; index++) {
      columns[index] = {
        ...columns[index],
        editable: false,
      };
    }
  }

  const handleCellChange = (params: GridCellParams, event: MuiEvent) => {
    if (onChange) {
      onChange(
        parseInt(params.id as string),
        params.field,
        params.row[params.field] || ""
      );
    }
  };

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
        onCellEditStop={handleCellChange}
      />
    </Box>
  );
}
