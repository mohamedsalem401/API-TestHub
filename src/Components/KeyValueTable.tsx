import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { type Header } from '../state/new/RequestReducer';

const columns: GridColDef[] = [
  { field: 'key', headerName: 'key', editable: true, width: 150 },
  { field: 'value', headerName: 'value', editable: true, width: 150 },
];

interface KeyValueTableProps {
  rows: Header[];
  onChange: (id: string, header: Partial<Header>) => void;
}

export function KeyValueTable({ rows, onChange }: KeyValueTableProps) {
  const handleProcessRowUpdate = (newRow: any, oldRow: any) => {
    const { id, ...row } = newRow as Header;
    onChange(id, row);

    return newRow;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        sx={{ width: '100%' }}
        rows={rows}
        columns={columns}
        density='comfortable'
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        checkboxSelection
        disableRowSelectionOnClick
        disableVirtualization
        disableDensitySelector
        disableEval
        processRowUpdate={handleProcessRowUpdate}
        onProcessRowUpdateError={(error) => console.error(error)}
      />
    </Box>
  );
}
