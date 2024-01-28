import { Box, Typography } from '@mui/material';
import { RequestBodyTabs } from './RequestBodyTabs';
import { RequestBody } from './RequestBody';

export function RequestBodyContainer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <Typography variant='h4'>Body</Typography>
      <RequestBodyTabs />
      <RequestBody />
    </Box>
  );
}
