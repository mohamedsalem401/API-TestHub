import { Box, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { requestActions, type Header } from '../state/new/RequestReducer';
import { Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

const columns: GridColDef[] = [
  { field: 'key', headerName: 'key', editable: true, width: 150 },
  { field: 'value', headerName: 'value', editable: true, width: 150 },
  {
    field: 'actions',
    renderHeader: () => null,
    sortable: false,
    renderCell: (row) => {
      const { id } = row.row;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const dispatch = useDispatch();

      return (
        <IconButton
          aria-label='delete'
          color='error'
          onClick={() => dispatch(requestActions.deleteHeader(id))}
        >
          <Delete />
        </IconButton>
      );
    },
  },
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
