import { Box } from '@mui/material';
import { ResponseActions } from './ResponseActions';
import { ResponseResults } from './ResponseResults';

export function ResponseContainer() {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'stretch',
        width: '100%',
        alignItems: 'flexStart',
        gap: '16px',
      }}
    >
      <ResponseActions />
      <ResponseResults />
    </Box>
  );
}
