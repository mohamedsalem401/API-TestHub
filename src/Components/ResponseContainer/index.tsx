import { Box, TextField } from '@mui/material';
import { ResponseBody } from './ResponseBody';
import { ResponseTabs } from './ResponseTabs';
import { ResponseActions } from './ResponseActions';

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
      {/* Header */}
      <ResponseActions />

      {/* <ResponseTabs />

      <ResponseBody /> */}
    </Box>
  );
}
